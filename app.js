const  person = { name: "Hedy Lamarr", inventions: 5 };

export default function Person() {
  return (
    <div>
      <h1>{person.name}</h1>
      <p>{person.inventions}</p>
    </div>
  );
}
