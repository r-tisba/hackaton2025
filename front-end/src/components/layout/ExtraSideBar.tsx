import React from 'react';

export function ExtraSidebar() {
  return (
    <div className="extra-sidebar">
      <h2>🔥 Trending</h2>
      <ul>
        <li>#TechNews</li>
        <li>#ReactJS</li>
        <li>#WebDevelopment</li>
        <li>#Crypto</li>
        <li>#AI</li>
      </ul>

      <h2 className='mt-5'>📢 Sponsorisé</h2>
      <div className="fake-ad"> 
        <img src="https://walt.community/uploads/media/6221df85c9729_.png" alt="Fake Ad" />
        <p>🚀 Découvre les meilleurs hackathons de ta région ! 💻🏆</p>
        <p>🔥 Pas de foutaises ! 🔥</p>
      </div>

      <div className="fake-ad mt-2">
        <img src="https://i.pinimg.com/736x/a4/1f/c1/a41fc18daa53e64e9af2da5beb04f2c3.jpg" alt="Fake Ad" />
        <p>Besoin de terminer en urgence un projet mais plus d'énergie ? ⚡😴</p>
        <p>Nous avons la solution ! 🚀💡</p>
      </div>

      <h2 className='mt-5'>💬 Espace Libre</h2>
      <p>Espace libre.</p>
      <p>J'ai plus d'inspi là.</p>
    </div>
  );
}
