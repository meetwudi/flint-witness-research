import { InterestCta } from "./interest-cta";

export type PacketExpert = {
  rank: number;
  name: string;
  salutation: string;
  email: string;
  emailSource: string;
  role: string;
  fit: string;
  work: string;
  litigation: string;
  weakness: string;
  links: [string, string][];
};

export type PacketData = {
  title: string;
  fullCaption: string;
  deck: string;
  prepared: string;
  facts: [string, string][];
  assessmentTitle: string;
  assessmentBody: string;
  disciplines: string;
  stakes: { label: string; value: string; detail: string }[];
  technicalContext: {
    kicker: string;
    title: string;
    heading: string;
    paragraphs: string[];
    links: [string, string, string][];
  };
  issues: { title: string; question: string; proof: string; discipline: string }[];
  docket: { summary: string; url: string };
  recipient: { name: string; role: string; email: string; emailSource: string };
  experts: PacketExpert[];
  independenceNote: string;
  sources: [string, string, string][];
  limitations: [string, string];
  outreachSubject: string;
  pdfUrl?: string;
};

function expertMailto(expert: PacketExpert, packet: PacketData) {
  const fit = expert.fit.trim().replace(/[.!?]+$/, "");
  const body = `${expert.salutation},

I am counsel for [party] in ${packet.fullCaption}, ${packet.facts.find(([label]) => label === "Docket")?.[1]}.

I am reaching out regarding a potential expert consultation. Your publicly documented experience with ${fit} appears relevant to technical questions in the matter. Would you be open to a brief preliminary call, subject to an initial conflicts check?

No engagement is created by this inquiry. Please do not send confidential information at this stage.

Best,
[Attorney name]
[Firm]
[Phone]`;
  return `mailto:${expert.email}?subject=${encodeURIComponent(packet.outreachSubject)}&body=${encodeURIComponent(body)}`;
}

export function PacketPage({ packet }: { packet: PacketData }) {
  return <main className="packet-page">
    <nav className="nav shell"><a className="brand" href="#top">FLINT<span>·WITNESS</span></a><div className="navlinks"><a href="#matter">Matter</a><a href="#claims">Technical context</a><a href="#issues">Technical issues</a><a href="#experts">Potential experts</a><a href="#sources">Sources</a></div></nav>
    <section id="top" className="hero shell"><div className="eyebrow"><span/> Flint Witness Research · Post-filing expert research</div><h1>{packet.title}</h1><p className="dek">{packet.deck}</p><div className="hero-actions"><p className="label">Independent preliminary research based on public information.</p>{packet.pdfUrl&&<a className="pdf-link" href={packet.pdfUrl} target="_blank" rel="noreferrer">Open PDF packet ↗</a>}</div><div className="facts">{packet.facts.map(([label,value])=><div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div></section>

    <section id="matter" className="brief shell"><div className="section-no">01</div><div><p className="kicker">Preliminary assessment</p><h2>{packet.assessmentTitle}</h2><p className="lead">{packet.assessmentBody}</p><div className="callout"><b>Anticipated expert disciplines</b><p>{packet.disciplines}</p></div><div className="stakes">{packet.stakes.map(x=><div key={x.label}><small>{x.label}</small><strong>{x.value}</strong><p>{x.detail}</p></div>)}</div></div></section>

    <section id="claims" className="claims shell"><header className="section-head"><div><span>02</span><p className="kicker">{packet.technicalContext.kicker}</p></div><h2>{packet.technicalContext.title}</h2></header><div className="claim-explainer"><div><h3>{packet.technicalContext.heading}</h3>{packet.technicalContext.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</div><div className="patent-list">{packet.technicalContext.links.map(([label,sub,url])=><a key={url} href={url} target="_blank" rel="noreferrer"><span>{label}</span><b>{sub}</b><em>Open source ↗</em></a>)}</div></div></section>

    <section id="issues" className="issues shell"><header className="section-head"><div><span>03</span><p className="kicker">Technical issues</p></div><h2>Questions likely to require expert testimony</h2></header><div className="issue-list">{packet.issues.map((x,i)=><article key={x.title}><div className="issue-num">{String(i+1).padStart(2,"0")}</div><div><h3>{x.title}</h3><p className="question">{x.question}</p><p className="proof"><b>Potential evidence:</b> {x.proof}</p></div><div className="discipline">{x.discipline}</div></article>)}</div></section>

    <section className="band"><div className="shell"><p className="kicker">Matter verification</p><div className="verification"><div><small>Public docket</small><p>{packet.docket.summary}</p><a href={packet.docket.url} target="_blank" rel="noreferrer">Open docket ↗</a></div><div><small>Likely recipient for this research</small><p><b>{packet.recipient.name}</b><br/>{packet.recipient.role}</p><a href={`mailto:${packet.recipient.email}`}>{packet.recipient.email}</a><em>Official firm source; not inferred.</em></div></div></div></section>

    <section id="experts" className="experts shell"><header className="section-head"><div><span>04</span><p className="kicker">Potential experts</p></div><h2>We found ten potential experts—and a public email for each</h2></header><p className="method">Each candidate below includes matter-specific fit, relevant public work, litigation experience located in our search, diligence concerns and source links. “Draft email to expert” opens a pre-addressed, editable message in your mail application; nothing is sent automatically. The order is preliminary, not a retention recommendation, and no availability or conflicts check has been performed.</p><div className="expert-grid">{packet.experts.map(e=><article key={e.rank} className="expert"><div className="rank">{String(e.rank).padStart(2,"0")}</div><h3>{e.name}</h3><p className="role">{e.role}</p><dl><dt>Technical fit</dt><dd>{e.fit}</dd><dt>Relevant work</dt><dd>{e.work}</dd><dt>Public litigation experience</dt><dd>{e.litigation}</dd><dt>Points for further diligence</dt><dd>{e.weakness}</dd></dl><div className="source-links">{e.links.map(([label,url],linkIndex)=><a key={`${url}-${linkIndex}`} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</div><div className="email-action"><a className="email-btn" href={expertMailto(e,packet)}>Draft email to expert</a><a className="email-evidence" href={e.emailSource} target="_blank" rel="noreferrer">{e.email} · public source ↗</a></div></article>)}</div></section>

    <section className="band diligence"><div className="shell"><p className="kicker">Diligence before contact or retention</p><h2>Preliminary candidates; no conflicts or availability determination.</h2><div className="diligence-grid"><p>Run party, affiliate, counsel, inventor, funder and technology conflicts.</p><p>Confirm testimony history, exclusions, compensation, publications and deposition performance.</p><p>Investigate patents, licensing, grants, consulting and commercial interests.</p><p>Confirm role fit, availability and interest only after counsel authorizes outreach.</p></div><div className="excluded"><b>Initial independence screen:</b> {packet.independenceNote}</div></div></section>

    <section id="sources" className="sources shell"><header className="section-head"><div><span>05</span><p className="kicker">Sources and limitations</p></div><h2>Public record and research boundaries</h2></header><div className="source-list">{packet.sources.map(([tag,title,url],i)=><a key={url} href={url} target="_blank" rel="noreferrer"><span>{String(i+1).padStart(2,"0")}</span><div><small>{tag}</small><p>{title}</p></div><b>↗</b></a>)}</div><div className="limits"><p>{packet.limitations[0]}</p><p>{packet.limitations[1]}</p></div></section>

    <section className="service-cta"><div className="shell"><div><p className="kicker">Flint Witness Research</p><h2>Receive matter-specific expert research as a technical case develops.</h2><p>We work in the post-filing window—turning pleadings and public technical records into issue maps, researched candidate slates and diligence starting points before formal expert identification and retention is complete.</p></div><a href="https://tidycal.com/meetwudi/15-minute-meeting" target="_blank" rel="noreferrer">Schedule a 15-minute conversation ↗</a></div></section>

    <footer><div className="shell"><div className="footer-mark">FLINT<span>·WITNESS</span></div><p>Independent preliminary research based on public information.</p><p>Post-filing packet · Prepared {packet.prepared}</p></div></footer>
    <InterestCta packetTitle={packet.title} />
  </main>;
}
