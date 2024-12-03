import gymshark from "../../../public/gymshark.svg";
import muscleblaze from "../../../public/muscleblaze.svg";
import on from "../../../public/omptimumnutrition.svg";
import nike from "../../../public/nike.svg";
import therabody from "../../../public/therabody.svg";

export default function TrustedBy() {
  return (
    <section className="max-w-[90%] mx-auto py-12" id="trusted-by">
      <h3 className="uppercase font-semibold text-accent leading-[22px] para-3xl text-center mb-12">
        trusted by
      </h3>
      <div className="flex items-center justify-between">
        <img
          className="w-auto h-8 filter brightness-0 opacity-50"
          src={gymshark}
          alt="Logo of a company that trusts this business."
        />
        <img
          className="w-auto h-11 filter brightness-0 opacity-50"
          src={muscleblaze}
          alt="Logo of a company that trusts this business."
        />
        <img
          className="w-auto h-12 filter brightness-0 opacity-50"
          src={on}
          alt="Logo of a company that trusts this business."
        />
        <img
          className="w-auto h-10 filter brightness-0 opacity-50"
          src={therabody}
          alt="Logo of a company that trusts this business."
        />
        <img
          className="w-auto h-8 filter brightness-0 opacity-50"
          src={nike}
          alt="Logo of a company that trusts this business."
        />
      </div>
    </section>
  );
}
