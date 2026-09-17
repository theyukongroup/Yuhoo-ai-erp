import Image from 'next/image';
import { BarChart3, Boxes, Check, FileText, ShoppingCart, Users, Workflow } from 'lucide-react';

const connections = [
  { name: 'Sales & CRM', detail: 'Keep opportunities moving', icon: Users },
  { name: 'Inventory', detail: 'Know what you have', icon: Boxes },
  { name: 'Purchasing', detail: 'Plan your next order', icon: ShoppingCart },
  { name: 'Company knowledge', detail: 'Find the answer faster', icon: FileText },
];

/** A conceptual service illustration, never a live customer dashboard. */
export function BusinessHub() {
  return <div className="business-hub" aria-label="Illustration of Yuhoo connecting company knowledge, sales, inventory, purchasing and reporting">
    <div className="hub-topline"><span><i /> A more connected business</span><small>CONCEPT ILLUSTRATION</small></div>
    <div className="hub-network">
      <svg className="hub-lines" viewBox="0 0 500 350" preserveAspectRatio="none" aria-hidden="true"><path d="M95 75 Q250 75 250 175 M405 75 Q250 75 250 175 M95 275 Q250 275 250 175 M405 275 Q250 275 250 175" /></svg>
      <div className="hub-center"><Image src="/yuhoo-icon.png" alt="" width={46} height={52} /><strong>Yuhoo.ai</strong><span>AI + ERP + Automation</span></div>
      {connections.map(({ name, detail, icon: Icon }, i) => <div className={`hub-app hub-app-${i}`} key={name}><span className="hub-app-icon"><Icon size={21} aria-hidden="true" /></span><strong>{name}</strong><small>{detail}</small></div>)}
    </div>
    <div className="hub-insight"><span className="hub-app-icon"><BarChart3 size={22} aria-hidden="true" /></span><div><strong>Better visibility. Clearer decisions.</strong><span>Your people, information and workflows together.</span></div><Check size={18} aria-hidden="true" /></div>
    <div className="hub-bottom"><Workflow size={14} aria-hidden="true" /> Built around how your business works</div>
  </div>;
}
