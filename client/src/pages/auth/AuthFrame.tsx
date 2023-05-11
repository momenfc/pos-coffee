import coverImg from 'assets/images/cover.png';
import posBanner from 'assets/images/pos_banner.jpg';
import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}
function AuthFrame({ title, children }: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${posBanner})` }}
      className="h-screen w-screen bg-center bg-no-repeat overflow-hidden grid grid-cols-2 items-center gap-4"
      // className="h-screen w-screen overflow-hidden grid grid-cols-2 items-center gap-4"
    >
      <div className="w-2/3 mx-auto">
        <h1 className="mb-8 text-2xl font-bold text-start leading-relaxed capitalize tracking-wide text-blue-500">
          {title}
        </h1>
        {children}
      </div>
      {/* <img
        src={posBanner}
        alt="Banner"
        // className="h-full w-full object-cover ms-auto select-none brightness-125"
        className="h-screen  object-cover select-none"
      /> */}
    </div>
  );
}

export default AuthFrame;
