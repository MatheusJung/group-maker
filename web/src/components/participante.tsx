import participante from "../assets/participante.png";

interface ParticipanteProps {
  nome: string;
  foto?: string;
}
export default function Participante({
  nome,
  foto = participante,
}: ParticipanteProps) {
  return (
    <li className="flex flex-col items-center justify-center border border-secondary p-1 rounded transition-colors duration-200 hover:bg-primary-light hover:border-primary-light hover:text-text-primary w-20 h-20 truncate cursor-pointer">
      <img
        className="bg-white h-15 w-15 rounded"
        src={foto}
        alt="Foto do participante"
      />
      <span className="text-xs">{nome}</span>
    </li>
  );
}
