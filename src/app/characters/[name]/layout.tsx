import { Metadata } from 'next'

type Props = {
    params: { name: string }
}

export async function generateMetadata(
    { params }: Props,

): Promise<Metadata> {
    const name = params.name

    return {
        title: `${name} - Tenryou 💮`
    }
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}