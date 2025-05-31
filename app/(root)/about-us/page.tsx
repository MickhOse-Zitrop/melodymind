import { Container } from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { members } from "@/data/data";
import { getInitials } from "@/lib";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MelodyMind — О нас",
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-secondary py-24 text-center">
        <Container>
          <h1 className="text-5xl font-bold mb-4 uppercase">
            Присоединяйтесь к самой прорывной компании в области музыкальных
            технологий
          </h1>
          <p className="text-muted-foreground mb-8">
            Мы - музыкальная компания, объединяющая продюсеров и артистов для
            сотрудничества и раскрытия их потенциала.
          </p>
          <a href="#community">
            <Button size="lg">Узнать больше</Button>
          </a>
        </Container>
      </div>
      <Container
        className="py-20 text-center flex items-center flex-col"
        id="community"
      >
        <h1 className="text-5xl font-bold mb-4 uppercase">
          Сообщество талантов
        </h1>
        <p className="text-muted-foreground mb-8">
          Мы - целеустремленная команда из Геленджика с разным опытом работы,
          <br /> объединенная общей страстью к музыке и расширением прав и
          возможностей независимых создателей.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/map_world.png" alt="Map" />
      </Container>
      <div className="bg-secondary py-24 text-center">
        <Container>
          <p className="text-muted-foreground mb-8 uppercase">
            Команда MelodyMind
          </p>
          <h1 className="text-5xl font-bold mb-4 uppercase">
            Познакомьтесь c командой
          </h1>
          <div className="flex flex-wrap-reverse justify-center gap-20 mt-16">
            {members.map((member, i) => (
              <div key={i} className="flex flex-col justify-center">
                <Avatar className="size-64">
                  <AvatarImage src={`/member-${i}.png`} />
                  <AvatarFallback className="text-7xl">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="mt-3 mb-1 font-bold text-lg">{member.name}</h2>
                <p className="text-muted-foreground">{member.speciality}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
