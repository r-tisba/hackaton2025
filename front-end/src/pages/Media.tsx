export function Media() {
    const fakeMedia = [
      { id: 1, src: "https://source.unsplash.com/random/400x300", caption: "Coucher de soleil magnifique 🌅" },
      { id: 2, src: "https://source.unsplash.com/random/401x301", caption: "Petite pause café ☕" },
      { id: 3, src: "https://source.unsplash.com/random/402x302", caption: "Mon nouveau setup de travail 💻" }
    ];
  
    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {fakeMedia.map((media) => (
          <div key={media.id} className="border p-2 rounded">
            <img src={media.src} alt={media.caption} className="w-full h-auto rounded" />
            <p className="text-sm mt-2">{media.caption}</p>
          </div>
        ))}
      </div>
    );
  }
  