import { mockUsers } from '@/data/mockData';

export function Replies() {
  const currentUser = mockUsers[0];

  const fakeReplies = [
    { id: 1, content: "C'est super intéressant ! Tu peux partager le titre du livre ?", originalTweet: "Just finished an amazing book on AI! 🤖📚" },
    { id: 2, content: "Je confirme, sans café je suis un zombie 🧟‍♂️", originalTweet: "Le café du matin, c’est sacré ☕ #MorningVibes" },
    { id: 3, content: "Je viens de le tester, ça a l'air prometteur !", originalTweet: "Quelqu'un a testé le nouveau framework React ? 👀" }
  ];

  return (
    <div>
      {fakeReplies.map((reply) => (
        <div key={reply.id} className="p-4 border-b border-gray-200">
          <p className="text-sm text-gray-500">En réponse à : <span className="italic">"{reply.originalTweet}"</span></p>
          <p className="mt-2">{reply.content}</p>
          <p className="text-gray-500 text-xs mt-1">@{currentUser.username}</p>
        </div>
      ))}
    </div>
  );
}
