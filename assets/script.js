document.querySelectorAll('[data-year]').forEach((node)=>node.textContent=new Date().getFullYear());

const pageOverrides=document.createElement('link');
pageOverrides.rel='stylesheet';
pageOverrides.href='assets/overrides.css';
document.head.appendChild(pageOverrides);

const brandTheme=document.createElement('style');
brandTheme.textContent=`
  :root{--paper:#444444;--purple:#7a3cff;--violet:#a56cff}
  .nav{background:#444444}.brand{color:#fff}.navlinks a{color:#efedf5}
  .mark{background:linear-gradient(145deg,#ad82ff,#5822be);box-shadow:0 8px 18px #00000055}
  .hero{background:radial-gradient(circle at 83% 10%,#7049ae 0,transparent 28%),linear-gradient(115deg,#444 12%,#383838 100%)}
  .hero h1{color:#fff}.hero p{color:#e4e1eb}.hero .eyebrow,.page-hero .eyebrow{color:#b99dff}
  .btn{box-shadow:0 8px 18px #1f102f55}
  .trust{background:#3d3d3d;border-color:#5e5e5e}.trust-inner{color:#eeedf4}.trust a{color:#c5aeff}
  .section{background:#fff}.page-hero{background:radial-gradient(circle at 83% 0,#69449e 0,transparent 28%),linear-gradient(120deg,#444,#383838)}
  .page-hero h1{color:#fff}.page-hero p{color:#e3e0ea}.breadcrumbs{color:#ded7e9}.breadcrumbs a{color:#c7afff}
`;
document.head.appendChild(brandTheme);

document.querySelectorAll('.mark').forEach((mark)=>{
  mark.innerHTML='<img src="assets/burnloop-logo.webp" alt="BurnLoop logo">';
});
const logoStyles=document.createElement('style');
logoStyles.textContent=`.mark{background:transparent!important;box-shadow:none!important;overflow:hidden}.mark:after{display:none}.mark img{width:100%;height:100%;display:block;object-fit:cover;border-radius:11px}`;
document.head.appendChild(logoStyles);

// Homepage refinements
const headerLinks=document.querySelector('.loop-links');
headerLinks?.querySelector('a[href="#faq"]')?.remove();
document.querySelector('.loop-actions .login')?.remove();
const headerDownload=document.querySelector('.loop-actions .loop-button');
if(headerDownload) headerDownload.textContent='Download now';
const heroButton=document.querySelector('.hero-copy .loop-button');
if(heroButton) heroButton.textContent='Start for free';

const main=document.querySelector('main');
const hero=document.querySelector('.loop-hero');
const reviews=document.querySelector('.testimonial-section');
const support=document.querySelector('#conditions');
const how=document.querySelector('#how');
const calorieSection=document.querySelector('.problem');
const proof=document.querySelector('.proof-strip');
proof?.remove();
if(main && hero && reviews && support && how && calorieSection){
  main.insertBefore(reviews,hero.nextElementSibling);
  main.insertBefore(support,reviews.nextElementSibling);
  main.insertBefore(how,support.nextElementSibling);
  main.insertBefore(calorieSection,how.nextElementSibling);
}

const conditionStack=document.querySelector('.condition-stack');
if(conditionStack){
  [...conditionStack.children].forEach((card)=>{
    if(card.textContent.includes('Allergies, preferences & goals')) card.remove();
    if(card.textContent.includes('High blood pressure guidance') && card.tagName !== 'A'){
      const link=document.createElement('a');
      link.href='high-blood-pressure.html';
      link.innerHTML=`${card.innerHTML}<i>→</i>`;
      card.replaceWith(link);
    }
  });
}

const pageRefinements=document.createElement('style');
pageRefinements.textContent=`
  .testimonial-section{background:#f7f5ff!important;color:#261947}
  .testimonial-section .loop-kicker{color:#6248ae}.testimonial-grid article{background:#fff!important;color:#281a4a;border:1px solid #e8e1fa}
  .testimonial-grid p{color:#62577a!important}.testimonial-grid small{color:#857b98!important}
  .testimonial-heading h2{color:#261947}.testimonial-grid strong{color:#281a4a}
  .condition-v2 .section-title{font-size:clamp(32px,4vw,51px);letter-spacing:-.055em;line-height:1.1;margin:0 0 18px}
`;
document.head.appendChild(pageRefinements);

// Melert brand migration: update visible brand language and use the supplied logo files.
const brandWalker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
const brandTextNodes=[];
while(brandWalker.nextNode()) brandTextNodes.push(brandWalker.currentNode);
brandTextNodes.forEach((node)=>{
  node.nodeValue=node.nodeValue.replaceAll('BurnLoop','Melert').replaceAll('burnloop','melert');
});
document.title=document.title.replaceAll('BurnLoop','Melert').replaceAll('burnloop','melert');
document.querySelectorAll('meta[content]').forEach((meta)=>{
  meta.content=meta.content.replaceAll('BurnLoop','Melert').replaceAll('burnloop','melert');
});
document.querySelectorAll('.loop-brand').forEach((brand)=>{
  const image=brand.querySelector('img');
  if(!image) return;
  const isFooter=Boolean(brand.closest('.loop-footer'));
  image.src=isFooter ? 'assets/melert-logo-white.svg' : 'assets/melert-logo.svg';
  image.alt='Melert logo';
  image.classList.add('melert-wordmark');
  brand.querySelector('span:not(.mark)')?.remove();
});
const melertLogoStyles=document.createElement('style');
melertLogoStyles.textContent=`
  .loop-brand{gap:0!important}.loop-brand img.melert-wordmark{width:132px!important;height:auto!important;max-height:36px;border-radius:0!important;display:block;object-fit:contain}
  .loop-footer .loop-brand img.melert-wordmark{width:132px!important}
`;
document.head.appendChild(melertLogoStyles);

// Keep the legal page easy to find from every site footer.
document.querySelectorAll('.loop-footer .footer-inner > div').forEach((footerLinks)=>{
  if(!footerLinks.querySelector('a[href="privacy.html"]')){
    const privacyLink=document.createElement('a');
    privacyLink.href='privacy.html';
    privacyLink.textContent='Privacy policy';
    footerLinks.appendChild(privacyLink);
  }
});
