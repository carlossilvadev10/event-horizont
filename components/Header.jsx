"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className = {`fixed left-0 right-0 top-0 z-10 border-b transition-all duration-200 ${isScrolled ? "border-white/10 bg-dark/95 backdrop-blur-sm" : "border-transparent"}`}>
            <div className = "container mx-auto h-full py-4 xl:py-6">
                <nav className = "flex justify-between items-center h-full">
                    {/* Logo */}
                    <Link href = "/">
                        <Image src = "/assets/header/logo.svg" width = {70} height = {70} alt = "image-logo" className = "w-auto h-auto" />
                    </Link>
                    <div className = "flex gap-4">
                        <button className = "btn btn-tertiary">
                            Iniciar sesión
                        </button>
                        <button className = "btn btn-accent">
                            Registrarse
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;