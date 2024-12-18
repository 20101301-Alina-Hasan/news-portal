/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react';
import { UserContext, UserContextType } from '../interfaces/userInterfaces';
import { ThemeButton } from './ThemeButton';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Outlet } from 'react-router-dom';
import { showToast } from '../utils/toast';
import { BookMarked, FilePlus } from 'lucide-react';
import Cookies from 'js-cookie';

export function Navbar() {
    const { userState, userDispatch } = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('access_token');
        userDispatch({ type: 'logout', payload: undefined });
        showToast('success', 'logged out successfully');
        navigate('/');
    };

    return (
        <>
            <div className="navbar bg-base-100 px-4 py-4 h-18 border-b-gray-500 border-b-[0.05rem]">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl font-serif font-extrabold" onClick={() => navigate('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                        </svg>
                        The Newsletter Community
                    </a>
                </div>
                <div className="flex-1 justify-end">
                    <div className="flex items-center gap-2">
                        {userState.token ? (
                            <div className="space-x-4">
                                <a className="btn btn-primary h-8 font-bold" onClick={() => navigate('/create')}>
                                    <FilePlus />
                                </a>
                                <HashLink to="/my-articles#bookmarks" scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                                    <a className="btn bg-red-700 text-white h-8 font-bold" >
                                        <BookMarked />
                                    </a>
                                </HashLink>
                            </div>
                        ) : null}
                        <div className="bg-base-200 rounded-lg flex items-center h-12 pr-2 pl-4">
                            <ThemeButton />
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-4 shadow-lg space-y-2">
                                    {userState.token ? (
                                        <>
                                            <div className="text-md text-center font-semibold">Hi, {userState.user?.name}!</div>
                                            <div className="divider divider-primary my-[2px]" />
                                            <li><a onClick={() => navigate('/my-articles')}>Dashboard</a></li>
                                            <HashLink to="/my-articles#bookmarks" scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                                                <li><a>Bookmarks</a></li>
                                            </HashLink>
                                            <li><a onClick={() => navigate('/')}>Explore</a></li>
                                            <li><a onClick={handleLogout}>Logout</a></li>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-md text-center font-semibold">Welcome!</div>
                                            <div className="divider divider-primary my-[2px]" />
                                            <li><a onClick={() => navigate('/')}>Explore</a></li>
                                            <li className="text-md font-semibold">
                                                <a onClick={() => navigate('/login')}>Login</a>
                                            </li>
                                        </>
                                    )}
                                    <div className='btn btn-md btn-base-100 mt-[2px] border-base-300 hover:btn-base-300'>
                                        <a onClick={() => navigate('/signup')}>Create an account?</a>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}
