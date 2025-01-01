'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Fragment } from 'react';

function Header() {
    const { user, isLoaded, isSignedIn } = useUser();
    const pathname = usePathname()
    const segments = pathname.split("/")
    console.log(segments)

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-between items-center p-4 bg-gray-100">
            <SignedOut>
                <SignInButton />
            </SignedOut>

            <SignedIn>
                {isSignedIn && user ? (
                    <div className="flex justify-between items-center w-full">
                        <h1 className="font-bold text-2xl text-black">{user.firstName}&apos;s Space</h1>

                        {/**Breadcrumbs */}
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='/'>
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {segments.map((segment, index) => {
                                    if (!segment) return null

                                    const href = segments.slice(0, index + 1).join("/");
                                    const isLast = index === segments.length - 1

                                    return (
                                        <Fragment key={segment}>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                {isLast ? (
                                                    <BreadcrumbPage>
                                                        {segment}
                                                    </BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink href={href}>
                                                        {segment}
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>

                                        </Fragment>
                                    )

                                })}
                            </BreadcrumbList>
                        </Breadcrumb>


                        {/* Wrapper around UserButton */}
                        <div className="flex w-12 h-12 items-center jusfify-content-center">
                            <UserButton />
                        </div>
                    </div>
                ) : (
                    <SignInButton />
                )}
            </SignedIn>
        </div>
    );
}

export default Header;
