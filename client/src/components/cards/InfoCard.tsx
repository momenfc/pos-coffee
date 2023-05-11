interface InfoCardProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  extra?: string | React.ReactNode;
}

function InfoCard({ title, description, extra }: InfoCardProps) {
  return (
    <div className="px-4 py-6 border rounded-lg shadow-lg w-72 min-w-max flex flex-col justify-center items-center gap-4 text-gray-500 font-bold tracking-wide">
      <h4 className="text-lg uppercase">{title}</h4>
      <p className="text-5xl text-color-primary font-semibold uppercase">
        {description}
      </p>
      {extra && <span className="text-sm">{extra}</span>}
    </div>
  );
}

export default InfoCard;
