import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'} className="block mx-auto text-center">
      <Image src={'/images/logo.png'} alt="logo" width={140} height={40} />
    </Link>
  );
};

export default Logo;
