import Image from 'next/image';
import type { Metadata } from 'next';
import CardWithButton from '@/components/CardWithButton'

export const metadata: Metadata = {
    title: "About Page",
    description: "Contains profile card for Jane Doe"
}

export default function AboutPage() {
    return (<div>
        <ProfileCard></ProfileCard>
        <CardWithButton></CardWithButton>
        </div>)
}

export function ProfileCard() {
    return (
  <div className="max-w-xs bg-white rounded-xl shadow-md overflow-hidden p-4 text-center">
        <Image 
        className="rounded-full border-2 border-indigo-500 mx-auto" 
        src='/img.jpeg'
        alt="Profile Picture" 
        width={80} 
        height={80} 
      ></Image>
     <h2 className="mt-4 text-xl font-semibold text-gray-800">Jane Doe</h2>
        <p className="text-sm text-gray-500">Frontend Developer</p>
    <p className="mt-2 text-gray-600 text-sm">Passionate about creating beautiful and functional web experiences.</p>
    <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
    Follow
    </button>
    </div>
    )
}