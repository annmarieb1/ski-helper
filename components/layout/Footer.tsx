interface FooterProps {
    version?: string;
}

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0";

export default function Footer({ version = APP_VERSION}: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-card">
            <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-sm text-muted-foreground md:flex-row">
                <span className="md:absolute md:left-1/2 md:-translate-x-1/2">
                    © {currentYear} Ski Finder. All rights reserved.
                </span>

                <span className="font-mono text-xs md:ml-auto">
                    v{version}
                </span>
            </div>
        </footer>
    );
}
