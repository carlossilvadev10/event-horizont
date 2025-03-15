import React from "react";
import Image from "next/image";
import Link from "next/link";

const DownloadApp = () => {
    return (
        <section className = "w-full bg-accent mb-16 rounded-2xl bg-pattern bg-cover p-10 xl:p-20 bg-blend-multiply flex items-center justify-center">
            <div className = "flex flex-col xl:flex-row items-center gap-6">
                {/* text */}
                <div className = "flex-1 text-center xl:text-left">
                    <h2 className = "h2 mb-4">
                        Disfruta eventos increíbles donde quieras, hoy mismo
                    </h2>
                    <p className = "max-w-[410px] mx-auto xl:mx-0">
                        Descarga nuestra app y accede al instante a los próximos eventos y recomendaciones personalizadas.
                    </p>
                </div>
                {/* buttons */}
                <div className = "flex-1 flex flex-col md:flex-row items-center justify-end gap-4">
                    <Link href = "#/" className = "relative flex w-[192px] h-[64px]">
                        <Image src = "/assets/download/app-store.svg" fill className = "object-contain" alt = "app-store" />
                    </Link>
                    <Link href = "#/" className = "relative flex w-[216px] h-[64px]">
                        <Image src = "/assets/download/google-play.svg" fill className = "object-contain" alt = "google-play" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default DownloadApp;