import EmptyData from '@/components/fallback/emptydata';
import React from 'react'

interface Features {
    name: string;
}

interface Property {
    features: Features[];
}

interface FeaturesSectionProps {
    data: Property;
}

const BuildingFeatures: React.FC<FeaturesSectionProps> = ({ data }) => {
    return (
        <section className="w-full flex flex-col justify-center">
            <div className="py-6">
                <h1 className="font-bold text-2xl uppercase">Building Features</h1>
                <div className="flex flex-wrap justify-center gap-2 py-4">
                    {data?.features && data.features.length > 0 ? (
                        data.features.map((build, index) => (
                            <p key={index} className="py-1 px-2 bg-default-100 rounded-lg">
                                {build.name}
                            </p>
                        ))
                    ) : (<EmptyData fallbackname={"Building Features"} />)}
                </div>
            </div>
        </section>
    )
}

export default BuildingFeatures
