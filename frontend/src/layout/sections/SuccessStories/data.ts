import { TSuccessStories } from "./type";
import deadlifting from "@/assets/images/deadlifting.jpg";
import stretching from "@/assets/images/stretching-man.jpg";
import rolling from "@/assets/images/rolling-woman.jpg";

export const successStories: TSuccessStories[] = [
  {
    id: 0,
    name: "John Doe",
    testimonial:
      "kubeFit has completely transformed my fitness journey. The personalized workout plans, the easy-to-use app, and the guidance from the trainers have made staying fit enjoyable. The gym is equipped with the latest gear, and the environment is always motivating. I can’t recommend kubeFit 360° enough for anyone looking to get serious about their fitness goals!",
    image: stretching,
  },
  {
    id: 2,
    name: "Jane Smith",
    testimonial:
      "As a working professional, I love how kubeFit makes fitness accessible. The app's ability to track my progress, schedule workouts, and even order supplements online is amazing. The trainers are supportive and customize plans to fit my busy schedule. It’s not just a gym; it’s a lifestyle solution!",
    image: deadlifting,
  },
  {
    id: 1,
    name: "Alex Carter",
    testimonial:
      "Getting kubeFit was the best decision I made this year. I was new to working out, but the trainers here made me feel comfortable and guided me every step of the way. The equipment is top-notch, and the community is so supportive. I’ve seen incredible progress in just a few months, and I’m excited to keep going!",
    image: rolling,
  },
];
