import {ellipsis, getAssetPath, getImageData, getSvgSrc} from "../utils.js";
import {ProfileOptions, SizeOptions} from "../types.js";
import {QRCodeSVG} from "qrcode.react";

const templateSolidMember = (
  {name, did, timestamp, avatar, accentColor, bgColor, bgImg='https://starfish-f3983.web.app/assets/images/bg-alph.png', qrCodeLink, badges, bio, title}: ProfileOptions,
  options?: SizeOptions
) => {

  let bgStyle = {};

  badges = [{label: "Admin"},{label: "Builder"},{label: "DAO"}]

  avatar = 'https://starfish-f3983.web.app/assets/images/minion1.png';

  if (!bgColor) {
    bgStyle = { backgroundColor: bgColor }
  }
  if (!accentColor) accentColor = 'white';

  if (bgImg) {
    if (bgImg.startsWith('http')) {
      bgImg = `url(${bgImg})`;
    }
    else {
      bgImg = `url(${getAssetPath('images',bgImg)})`;
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
  const roleMark = getSvgSrc('cabana/cabana-logo-mark.svg');
  const hasRoles = badges && badges.length;
  const cardHeight = hasRoles ? 260 : 230;
  const cardStyle = { borderRadius: '10px', backgroundColor: 'white', border: '1px solid #D7D8D9', padding: '4px 8px', gap: '6px', fontSize: '14px' };
  // const titleStr = titles && titles.length ? titles.join(' | ') : '';
  const titleStr = title || '';
  const bioStyle: any = { color: 'white', textAlign: 'center', alignItems: 'center', height: hasRoles ? '62px' : '82px' };

  return (

      <div className="profile-wrapper text-black flex flex-col w-full h-full pt-[100px] px-[20px] relative" style={{ borderRadius: '12px', ...bgStyle }}>
        <div className="flex absolute top-[20px] right-[22px]">
          <img width="24px" src={logo}  />
        </div>
        <div className="flex flex-col bg-white rounded-xl w-full relative" style={{height: cardHeight, boxShadow: '0 4px 8px 0px rgb(0 0 0 / 0.2)'}}>
          <div className="flex top-[-40px] left-[24px] p-[3px] w-[128px] h-[128px] rounded-full absolute" style={{backgroundColor: accentColor, boxShadow: '0 4px 8px 0px rgb(0 0 0 / 0.2)'}}>
            <img src={avatarImg} className="w-full h-full rounded-full" />
          </div>
          <div className="flex flex-col self-end mr-[24px] mt-[24px]">
            <div className="flex self-end">
              <img width="157px" height="45px" src={logo}/>
            </div>
            <div className="text-[14px] mt-[4px] ml-[4px] max-w-[180px] font-mono text-wrap text-right">
              Issued {new Date(timestamp).toLocaleString(undefined, { timeZone: 'UTC', timeZoneName: 'short', month: 'short', day: '2-digit', year: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit'})}
            </div>
          </div>

            <div className="flex items-center justify-between mt-[24px] mx-[26px]">
              <div className="flex flex-col gap-1">
                <div className="font-bold text-[22px]">{name}</div>
                <div className="text-[18px]">{titleStr}</div>
                <div className="text-[14px] my-[1px] font-mono">{didLabel}</div>
              </div>
              <div className="flex flex-col">
                <QRCodeSVG value={qrCodeLink} level="M" size={84} />
                {!isVerified && (<div className="text-[14px] text-[gray] m-2">Scan to verify</div>)}
              </div>
            </div>
            {hasRoles && (
              <div className="flex mt-[10px] mx-[24px]" style={{ gap: '6px', width: `${maxWidth}px`, flexWrap: 'wrap' }}>
                {badges.map((d, i) => (<div className="flex" style={cardStyle} key={'k'+i}><img src={roleMark} width='12px' ></img>{d.label}</div>))}
              </div>
              )}

        </div>
        {bio && (<div className="flex font-bold text-[14px] justify-center" style={bioStyle}>{bio}</div>)}

      </div>
  );
};


export default templateSolidMember;