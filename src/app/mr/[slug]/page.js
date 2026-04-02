import Image from 'next/image';
import { notFound } from 'next/navigation';
import EnquiryForm from '../../components/EnquiryForm';
import ScrollReveal from '../../components/ScrollReveal';

export async function generateStaticParams() {
  return [
    { slug: '2-bhk-flats' },
    { slug: 'bungalow-plots' }
  ];
}

const mrData = {
  '2-bhk-flats': {
    title: 'नांदेड सिटी पुणे मध्ये 2 BHK लक्झरी फ्लॅट्स',
    sub: 'सिंहगड रोड वरील सर्वात मोठी आणि सुरक्षित टाऊनशिप. आजच भेट द्या.',
    bhk: '2 BHK',
    clusterName: 'Aalaap',
    heroImg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    bullets: [
      '७८ लाख रुपयांपासून सुरुवात (शून्य ब्रोकरेज)',
      '७०० एकर निसर्गरम्य टाऊनशिप - उद्याने, शाळा आणि हॉस्पिटल',
      'महारेरा (MahaRERA) नोंदणीकृत व १००% कायदेशीर सुरक्षितता'
    ],
  },
  'bungalow-plots': {
    title: 'पुण्यातील सर्वात प्रीमियम N.A. बंगलो प्लॉट्स',
    sub: 'डॉक्टर, उद्योजक आणि आयटी प्रोफेशनल्सची पहिली पसंती.',
    bhk: 'Branded NA Bungalow Plots',
    clusterName: 'Melody / Rhythm',
    heroImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    bullets: [
      '१,२०० चौ. फुटांपासून प्रशस्त प्लॉट्स',
      '१५,००० हून अधिक कुटुंबांचा विश्वास (नांदेड सिटी डेव्हलपर्स)',
      'स्वतःचा स्वतंत्र बंगला बांधण्याची सुवर्णसंधी'
    ],
  }
};

export default async function MarathiLocalPage({ params }) {
  const resolvedParams = await params;
  const data = mrData[resolvedParams.slug];
  if (!data) notFound();

  return (
    <>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#0f172a', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <Image
          src={data.heroImg}
          alt={data.title}
          fill
          priority
          fetchPriority="high"
          style={{ objectFit: 'cover', opacity: 0.3 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 100%)' }} />

        <div className="container" style={{ position: 'relative', padding: '120px 32px 100px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '60px', alignItems: 'center' }}>
          
          <div>
            <span style={{ display: 'inline-block', backgroundColor: 'var(--accent-gold)', color: '#000', padding: '6px 14px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
              अधिकृत नांदेड सिटी पुणे
            </span>
            <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px', color: '#fff' }}>
              {data.title}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', fontWeight: '500' }}>
              {data.sub}
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {data.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '1.2rem', color: '#e2e8f0' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✔</span> {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Lead Form */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.3rem', marginBottom: '8px', textAlign: 'center' }}>अधिक माहितीसाठी संपर्क करा</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px', textAlign: 'center' }}>खालील फॉर्म भरा. आमचे प्रतिनिधी लवकरच आपल्याशी संपर्क साधतील.</p>
            <EnquiryForm clusterName={data.clusterName} bhk={data.bhk} />
          </div>

        </div>
      </section>

      {/* SEO Prose section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
             <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '24px' }}>का निवडावे नांदेड सिटी?</h2>
             <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.8', marginBottom: '24px' }}>
               पुण्यातील सिंहगड रोड परिसरातील <strong>नांदेड सिटी</strong> हे फक्त गृहप्रकल्प नसून एक परिपूर्ण शहर आहे. १५,००० हून अधिक कुटुंबे येथे सुरक्षित आणि सुखकर जीवन जगत आहेत. डेस्टिनेशन सेंटर, सिम्फनी आयटी पार्क (Symphony IT Park), नांदेड सिटी पब्लिक स्कूल आणि प्रशस्त क्रीडा संकुलामुळे (Kridaangan) इथली जीवनशैली खऱ्या अर्थाने अत्याधुनिक बनली आहे.
             </p>
             <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.8' }}>
               नवीन पुलाच्या (Sinhgad Road Flyover) मुळे हिंजवडी आणि स्वारगेटसारख्या मध्यवर्ती ठिकाणांवर पोहोचणे अत्यंत सोयीचे झाले आहे. आजच आपली साईट व्हिजिट बुक करा आणि स्वप्नातील घर नक्की करा.
             </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
