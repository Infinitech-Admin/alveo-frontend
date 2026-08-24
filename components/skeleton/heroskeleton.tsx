'use client';

import { Skeleton } from '@heroui/react';
import React from 'react';

const HeroSkeleton = () => {
    return (
        <section className="relative flex items-center justify-center w-full min-w-screen bg-cover bg-center bg-no-repeat">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45 z-10"></div>
            
            {/* Content */}
            <div className="relative z-20 text-center max-w-3xl px-6 md:px-0 py-12">
                <Skeleton className="h-8  rounded-lg" />
                <Skeleton className="h-4 w-4/5 mx-auto mt-4 rounded-lg" />

                <div className="flex flex-col md:flex-row justify-center gap-3 mt-8">
                    <Skeleton className="h-10 w-40 rounded-lg" />
                    <Skeleton className="h-10 w-40 rounded-lg" />
                </div>

                <div className="flex justify-center gap-6 py-8 mt-8">
                    <div className="text-center">
                        <Skeleton className="h-6 w-16 mx-auto rounded-lg" />
                        <Skeleton className="h-4 w-24 mx-auto mt-2 rounded-lg" />
                    </div>
                    <div className="text-center">
                        <Skeleton className="h-6 w-16 mx-auto rounded-lg" />
                        <Skeleton className="h-4 w-24 mx-auto mt-2 rounded-lg" />
                    </div>
                    <div className="text-center">
                        <Skeleton className="h-6 w-16 mx-auto rounded-lg" />
                        <Skeleton className="h-4 w-24 mx-auto mt-2 rounded-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSkeleton;