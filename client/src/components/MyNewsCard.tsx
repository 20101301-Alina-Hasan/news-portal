/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Upvote } from "./Upvote";
import { Bookmark } from "./Bookmark";
import { NewsView } from "./NewsView";
import { NewsProps } from "../interfaces/newsInterface";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";
import Cookies from 'js-cookie';
import axios from "axios";

export function MyNewsCard({
    news_id,
    title,
    releaseDate,
    description,
    thumbnail,
    upvotes,
    commentCount,
    tags,
    username
}: NewsProps["news"]) {
    const [isNewsOpen, setIsNewsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const token = Cookies.get('access_token');
            await axios.delete(`http://localhost:3000/api/news/${news_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            showToast('success', 'Your article has been removed.');
            navigate('/');
        } catch (error: any) {
            showToast('error', `${error.message}: An error occurred while deleting the news.`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div
                onClick={() => setIsNewsOpen(true)}
                className="card bg-base-100 border-[1px] border-gray-500 hover:border-primary transition-colors cursor-pointer relative"
            >
                {thumbnail ? (
                    <figure className="relative">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-64 object-cover object-center"
                        />
                    </figure>
                ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image Available
                    </div>
                )}
                <div className="absolute top-2 right-2 dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        role="button"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75.75 0 0 1 0 1.5Z"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <li>
                            <button
                                className="block w-full text-left"
                                onClick={() => navigate('/edit', {
                                    state: {
                                        news_id,
                                        title,
                                        releaseDate,
                                        description,
                                        thumbnail,
                                        tags
                                    }
                                })}
                            >
                                Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="block w-full text-left text-red-600"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body p-4">
                    <div className="flex items-start justify-between gap-2">
                        <div className="space-y-2">
                            <h2 className="card-title">{title}</h2>
                            <div className="flex items-center gap-2 text-sm py-2">
                                <span>{releaseDate}</span>
                                <span className="ml-1 w-[0.1rem] h-[1.2rem] bg-amber-400" />
                                <span className="font-semibold">@{username}</span>
                            </div>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {tags.slice(0, 3).map((tag: string, index: number) => (
                                    <div
                                        key={index}
                                        className="badge badge-outline badge-md font-semibold"
                                    >
                                        #{tag}
                                    </div>
                                ))}
                                {tags.length > 3 && (
                                    <div className="badge badge-outline badge-md font-semibold">
                                        +{tags.length - 3}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[0.1rem] bg-red-800 mt-4 mb-2"></div>
                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center gap-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Upvote count={upvotes} />
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>

                                <span className="text-sm font-medium">{commentCount}</span>
                            </div>
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <Bookmark />
                        </div>
                    </div>
                </div>
            </div>

            <NewsView
                isOpen={isNewsOpen}
                onClose={() => setIsNewsOpen(false)}
                news={{
                    news_id,
                    title,
                    releaseDate,
                    description,
                    thumbnail,
                    upvotes,
                    commentCount,
                    tags,
                    username,
                }}
            />
        </>
    );
}
