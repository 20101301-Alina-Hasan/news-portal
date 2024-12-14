import { ThemeButton } from './ThemeButton';
import { FilterDrawer } from './FilterDrawer';

export function Navbar() {
    return (
        <div className="navbar bg-base-100 px-4 py-4 h-18">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                    </svg>
                    The Newsletter Community
                </a>
            </div>
            <div className="flex justify-center gap-2 ">
                <FilterDrawer />
                <div className="form-control ">
                    <input type="text" placeholder="Search" className="input input-bordered h-12 w-96 border-1 border-gray-500 rounded-full" />
                </div>
            </div>
            <div className="flex-1 justify-end">
                <div className="flex items-center gap-2">
                    <a className="btn btn-primary h-12 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </a>
                    <div className="bg-base-200 rounded-lg flex items-center h-12 pr-2 pl-4">
                        <ThemeButton />
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-5 w-5 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-4 shadow-lg">
                                <div className="divider divider-primary font-semibold">@username</div>
                                <li><a>Profile</a></li>
                                <li><a>Logout</a></li>
                                <div />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

