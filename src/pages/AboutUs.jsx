import { assetUrl } from '../config';

export default function AboutUs() {
  return <section className="about-page section-shell"><div className="about-intro"><p className="eyebrow">The RH standard</p><h1>Good products<br /><em>start close to the work.</em></h1><p>We are a footwear manufacturer built around an uncomplicated idea: make the everyday product better, then make it dependable at scale.</p></div><div className="about-grid"><div className="about-image"><img src={assetUrl('sl-002.webp')} alt="RH footwear production collection" loading="lazy" /></div><div className="about-facts"><div><strong>18</strong><span>years of footwear<br />manufacturing</span></div><div><strong>30+</strong><span>markets supplied<br />across 3 regions</span></div><div><strong>100%</strong><span>direct factory<br />communication</span></div></div></div></section>;
}
