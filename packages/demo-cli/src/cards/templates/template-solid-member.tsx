import {ellipsis, getAssetPath, getImageData, getSvgSrc} from "../utils.js";
import {ProfileOptions, SizeOptions} from "../types.js";
import {QRCodeSVG} from "qrcode.react";
import {Property} from "csstype";

const templateSolidMember = (
  {name, did, timestamp, avatar, accentColor, bgColor, bgImg, qrCodeLink, badges, bio, title}: ProfileOptions,
  options?: SizeOptions
) => {

  let bgStyle = {};

  // bgImg='https://starfish-f3983.web.app/assets/images/bg-alph.png'
  avatar = 'https://starfish-f3983.web.app/assets/images/avatar-dead-rare-nft.png';
  // bgImg = 'linear-gradient(180deg, #4EEF96 0%, #F98CF1 33%, #FDC77C 66%, #625AD1 100%)'
  bgColor = '#C8F054';

  if (bgColor) {
    bgStyle = { backgroundColor: bgColor }
  }

  // if (!accentColor) accentColor = 'white';

  if (bgImg) {
    if (bgImg.startsWith('http')) {
      bgImg = `url(${bgImg})`;
    }
    bgStyle = { backgroundImage: bgImg, backgroundSize: 'cover', backgroundPosition: 'center' };
  }

  const isVerified = true;
  const maxWidth = options?.width || 420;

  if (did.startsWith('t/')) {
    did = did.substring(2);
  }

  const didLabel = ellipsis(did,16,7);
  const avatarImg = avatar || getImageData('anonymous.png');
  // const logo = getSvgSrc('cabana/card-logo-cabana.svg');
  const logo = getSvgSrc('alph/alph_logo.svg', '#FF5D51');
  const roleMark = getSvgSrc('alph/aleph-logo-mark.svg');
  const extraRoles = '';
  const hasRoles = badges && badges.length > 0;
  const cardHeight = 240;//hasRoles ? 260 : 230;
  const cardStyle = { borderRadius: '10px', backgroundColor: 'white', border: '1px solid #D7D8D9', padding: '6px 12px', gap: '4px', fontSize: '14px', boxShadow: '0 2px 4px 0px rgb(0 0 0 / 0.2)' };
  // const titleStr = titles && titles.length ? titles.join(' | ') : '';
  const titleStr = title || '';
  const bioPointStyle = { borderLeft: '6px solid transparent', borderRight: '12px solid transparent', borderTop: '24px solid white', position: 'absolute', top: '28px', left: '38px', transform: 'rotate(15deg)', zIndex: 0 } as any;
  const date = new Date(timestamp);
  const dateStr = date.toLocaleDateString(undefined, {month: 'short', day: '2-digit', year: 'numeric'}) + ' ' +date.toLocaleTimeString(undefined, { timeZone: 'UTC', timeZoneName: 'short', hour12: false, hour: '2-digit', minute: '2-digit'});

  const resolveBadgeIcon = (label: string) => {
    if(label === 'DAO') return getSvgSrc('alph/aleph-dao-logo.svg');
    if(label === 'Artist' || label === 'Official') return getSvgSrc('alph/dead-rare-nft-logo.svg');
    return roleMark;
  }
  //Feb 26, 2024, 01:29 UTC
  return (

      <div className="profile-wrapper text-black flex flex-col w-full h-full pt-6 px-[20px] relative" style={{ borderRadius: '12px', ...bgStyle }}>
        <div>
          <div className="inline-flex font-semibold text-[14px] bg-white rounded-lg ml-9 relative py-2.5 px-4 mb-5" style={{boxShadow: '0 4px 6px 0px rgb(0 0 0 / 0.2)', visibility: bio ? "visible": "hidden", minWidth: "70px"}}>
            <div style={bioPointStyle}></div>
            <span style={{zIndex: 1}}>{bio}</span>
          </div>
        </div>
        <div className="flex flex-col bg-white rounded-xl w-full relative px-5 gap-2.5" style={{height: cardHeight, boxShadow: '0 4px 8px 0px rgb(0 0 0 / 0.2)'}}>
          <div className="flex justify-between mt-[14px]">
            <div className="flex p-[3px] w-[112px] h-[112px] rounded-full">
              <img src={avatarImg} className="w-full h-full rounded-full" />
            </div>
            <div className="flex flex-col items-end mt-[4px]">
              <div className="flex">
                <img width="157px" height="45px" src={logo}/>
              </div>
              <div className="font-semibold mt-1">
                Issued
              </div>
              <div className="text-[14px] ml-[4px] max-w-[100px] text-wrap text-right text-slate-600">
                {dateStr}
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="font-black text-[24px]">{name}</div>
              <div className="text-[14px] my-[1px] text-slate-600">{didLabel}</div>
            </div>
            <div className="flex flex-col">
              <QRCodeSVG value={qrCodeLink} level="M" size={84} />
              {!isVerified && (<div className="text-[14px] text-[gray] m-2">Scan to verify</div>)}
            </div>
          </div>
        </div>
        {hasRoles && (
          <div className="flex mt-4" style={{ gap: '6px', width: `${maxWidth}px`, flexWrap: 'wrap' }}>
            {badges.map((d, i) => (<div className="flex items-center" style={cardStyle} key={'k'+i}><img src={resolveBadgeIcon(d.label)} height='16px' ></img>{d.label}</div>))}
            {extraRoles && (<div className="flex items-center" style={{...cardStyle, padding: '6px 9px'}}>+{extraRoles}</div>)}
          </div>
        )}

      </div>
  );
};


export default templateSolidMember;