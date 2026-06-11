import Link from 'next/link';
import DolarIcon from '../../../assets/dolar-icon.png'
import Image from 'next/image'; 

interface AuthLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    footerText: string;
    footerLinkText: string;
    footerHref: string;
}



export const AuthLayout =({
    title,
    description,
    children,
    footerText,
    footerLinkText,
    footerHref,
}: AuthLayoutProps) => {
    return (
        <section className="h-screen flex items-center justify-center p-10">
            <div className="bg-[#181818] w-full max-w-md p-8 rounded-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className='bg-[#9333EA] h-16 w-16 flex items-center justify-center rounded-3xl mb-6'>
                        <Image src={DolarIcon} alt="Dolar Icon" />
                    </div>

                    <h1 className='text-white text-2xl font-bold mb-2'>
                    {title}</h1>
                    <p className='text-[#9F9FA9] text-sm'>{description}</p>   
                </div>
                {children}
                <div className='mt-10 text-center'>
                    <p className='text-[#9F9FA9] text-sm'>
                        {footerText} 
                        <Link href={footerHref} className='text-[#9333EA] ml-1 font-semibold hover:underline'>
                            {footerLinkText}
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}