export const person = {
  name: "Kunal Shah",
  email: "officialkunalshah@gmail.com",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kunal-shah-589bb4346" },
  ],
};

export const about = {
  heading: "About",
  lead: "I'm Kunal Shah — a pilot from Nepal, and an entrepreneur, builder, and creative thinker.",
  paragraphs: [
    "Aviation shaped the way I think. I'm drawn to machines, systems, and technology, and to the process of turning an idea into something real. Learning to fly taught me discipline, precision, responsibility, and the habit of thinking several steps ahead.",
    "Today I'm building businesses and brands while continuing my aviation career. My work sits at the intersection of aviation, entrepreneurship, technology, branding, and product development. I'm the Founder / Brand & Creative Director of HIMAL Legacy — responsible for its vision, brand identity, creative direction, product positioning, digital experience, and growth — and I'm involved in KitNation Nepal, where I work on building the brand and shaping its direction.",
    "I don't think of myself only as someone who runs businesses. I'm a builder: someone who notices an opportunity, imagines what it could become, and then finds ways to make it real. I like thinking about the whole journey of an idea — from a problem, to a product, to a brand, to an experience, to something in the hands of real customers.",
    "My long-term ambition is to build things that originate from Nepal but aren't limited by it — brands, products, and experiences that can compete internationally while carrying the creativity and ambition of where they came from. I'm early in that journey, and I'm actively building, learning, and experimenting.",
  ],
  image: { src: "/images/about-studio.jpg", alt: "Kunal Shah" },
  now: {
    doingTitle: "What I'm doing now",
    doingItems: [
      "Pursuing my aviation career and the next stage of my flying journey",
      "Building and developing HIMAL Legacy",
      "Working on KitNation Nepal",
      "Exploring technology and AI as tools for building businesses, brands, and creative work",
      "Developing my personal brand and digital presence",
    ],
    nextTitle: "What's next",
    nextText:
      "Continuing to fly, build, create, and explore new opportunities across aviation, entrepreneurship, technology, and creative business.",
  },
};

export const journey = {
  title: "Aviation",
  intro: [
    "Trained at Royhle Aviation Academy in the Philippines, where I progressed from initial flight training through commercial, instrument, and multi-engine qualifications.",
    "Aviation is more than a career for me. It's where my curiosity about machines, systems, decision-making, and continuous learning comes together. I'm eager to keep learning, build experience, and keep progressing toward the airline cockpit.",
  ],
  photo: { src: "/images/aviation-pilot.jpg", alt: "Kunal Shah in the cockpit, in pilot uniform" },
  timeline: {
    title: "Flight training & qualifications",
    stops: [
      { code: "SPL", name: "Student Pilot License" },
      { code: "PPL", name: "Private Pilot License" },
      { code: "CPL", name: "Commercial Pilot License" },
      { code: "IR", name: "Instrument Rating" },
      { code: "MER", name: "Multi-Engine Rating" },
      { code: "Frozen ATPL", name: "Airline Transport Pilot pathway" },
    ],
  },
  readMore: {
    lead: "See the aircraft I've trained on, simulator work, and a full breakdown of flight and core skills.",
    label: "Aircraft, simulator & flight skills",
    href: "/aviation",
  },
  gallery: {
    title: "Aircraft & simulator",
    items: [
      { image: "/images/aircraft-cessna-152.jpg", alt: "Cessna 152", title: "Cessna 152", caption: "Primary training — normal operations, takeoffs and landings, crosswind work, emergency procedures, and aircraft handling." },
      { image: "/images/aircraft-cessna-172.jpg", alt: "Cessna 172", title: "Cessna 172", caption: "Skill development — landing technique, emergency procedures, handling, and operational decision-making." },
      { image: "/images/aircraft-pa34.jpg", alt: "Piper PA-34 Seneca", title: "Piper PA-34", caption: "Multi-engine training — twin-engine operations and engine-out procedures." },
      { image: "/images/aircraft-redbird.jpg", alt: "Redbird flight simulator", title: "Redbird Flight Simulator", caption: "Simulator training — instrument procedures, cockpit workflows, emergency scenarios, and workload management." },
    ],
  },
  skillGroups: [
    {
      title: "Flight skills",
      items: [
        { term: "Crosswind landings", desc: "Wind correction, approach alignment, and landing technique in crosswind conditions." },
        { term: "Forward slips", desc: "Controlled descent and aircraft handling using forward slips." },
        { term: "Side slips", desc: "Side-slip technique for crosswind correction and runway alignment on landing." },
        { term: "Stall recovery", desc: "Recognizing and recovering from stalls while keeping the aircraft under control." },
        { term: "Engine failure procedures", desc: "Simulated engine failures in the C152, C172, and PA-34 — aircraft control, landing-area selection, and emergency drills." },
        { term: "Emergency procedures", desc: "Responding to simulated abnormal situations while prioritizing control, awareness, and safe decisions." },
      ],
    },
    {
      title: "Core skills",
      items: [
        { term: "Safety first", desc: "Preparation, procedures, risk awareness, and sound decision-making on every flight." },
        { term: "Crew resource management", desc: "Communication, teamwork, coordination, and workload management in the cockpit." },
        { term: "Situational awareness", desc: "Tracking the aircraft, weather, traffic, instruments, and the wider operational picture." },
        { term: "Workload management", desc: "Handling multiple cockpit tasks while holding priorities, accuracy, and safety." },
        { term: "Communication", desc: "Clear exchange with crew, ATC, instructors, and other aviation personnel." },
        { term: "Decision making", desc: "Assessing the situation, weighing options, and making structured, safety-focused calls." },
        { term: "Instrument flying", desc: "Flying on instruments and procedures when visual references are limited." },
        { term: "Aircraft handling", desc: "Precise control through takeoffs, landings, maneuvering, and changing conditions." },
        { term: "Adaptability", desc: "Staying calm and effective when weather, workload, or conditions shift." },
        { term: "Discipline & attention to detail", desc: "Following procedures accurately while watching the details that matter." },
        { term: "Continuous learning", desc: "A standing willingness to learn, take feedback, and build new knowledge." },
      ],
    },
  ],
  closing: {
    lead: "My goal is not simply to reach the cockpit. It's to keep learning until I become the pilot I aspire to be.",
    sub: "Safety, discipline, continuous learning, and sound decision-making will always be at the foundation of that journey.",
  },
};

export const work = {
  heading: "Selected work",
  intro:
    "Across both ventures my role is Founder / Brand & Creative Director. I identify the opportunity, define what the brand should become, and bring the right people and tools together to build it.",
  coreAreas: {
    title: "Core Areas",
    items: [
      "Brand Direction",
      "Creative Direction",
      "Product Positioning",
      "E-Commerce Strategy",
      "Content & Social",
      "Campaign Development",
      "Meta Ads",
      "SEO & Digital Growth",
    ],
  },
  items: [
    {
      year: "2026",
      name: "HIMAL Legacy",
      role: "Founder / Brand & Creative Director",
      logo: { src: "/images/himal-logo.png", alt: "HIMAL Legacy logo" },
      reverse: false,
      blocks: [
        {
          heading: "The opportunity",
          paragraphs: [
            "HIMAL Legacy was born from a simple belief: Nepal should not only be known for its mountains, but also for what it creates.",
            "In a market shaped largely by imported brands, HIMAL Legacy is building a Nepalese lifestyle label focused on quality, design, and everyday wear. Inspired by the spirit, resilience, and character of the Himalaya, we create apparel and essentials made for modern life — from everyday streets to weekends outdoors.",
            "Our ambition is bigger than building a local brand. We want to build a Nepalese name that earns trust at home and stands confidently on the global stage.",
          ],
        },
        {
          heading: "My role",
          paragraphs: [
            "As Founder / Brand & Creative Director, I shape the vision, identity, and creative direction of HIMAL Legacy. I turn ideas into concepts — defining what the brand stands for, how it looks, how it communicates, and how people experience it.",
            "From product ideas and design direction to branding, storytelling, and customer experience, I focus on the bigger picture: building a Nepalese lifestyle brand with a distinct identity, meaningful purpose, and the ambition to compete beyond Nepal.",
            "I may not write every line of code or make every product myself, but I define what should be created, why it matters, and where the brand is going.",
          ],
        },
        {
          heading: "The work",
          paragraphs: [
            "Building HIMAL Legacy from an idea into a brand with a clear point of view.",
            "I lead the brand's positioning, identity, and creative direction — defining how HIMAL Legacy looks, feels, speaks, and connects with people. I develop product concepts and turn technical features into stories that communicate real value without losing the character of the brand.",
            "From campaign concepts and visual direction to digital presence, social media, advertising, and customer experience, I connect the creative and commercial sides of the business. I explore ideas, test what works, learn from the response, and continuously refine the brand.",
            "The work is not simply about selling products. It is about creating a distinct Nepalese lifestyle brand with a strong identity, earning trust through what we create, and building something with the potential to grow beyond Nepal.",
          ],
        },
        {
          heading: "Outcome",
          stats: [
            { num: "500+", label: "orders in week one" },
            { num: "3", label: "countries shipped to" },
            { num: "2026", label: "launched" },
          ],
          paragraphs: [
            "Launched in 2026 to more than 500 orders in the first week. Since then, HIMAL Legacy has shipped internationally to India, Australia and the United States alongside its customers in Nepal. The social audience started small and is growing steadily as the brand builds.",
          ],
        },
      ],
      capabilities: {
        title: "Leadership Highlights",
        items: [
          "Brand Direction",
          "Creative Direction",
          "Product Positioning",
          "Product Storytelling",
          "E-Commerce Strategy",
          "Campaign Development",
          "Content & Social",
          "Meta Ads",
          "SEO & Digital Growth",
          "Customer Experience",
        ],
      },
      link: { label: "himallegacy.com", href: "https://himallegacy.com" },
    },
    {
      year: "2026",
      name: "KitNation Nepal",
      role: "Founder / Brand & Creative Director",
      logo: { src: "/images/kitnation-logo.png", alt: "KitNation Nepal logo" },
      reverse: true,
      blocks: [
        {
          heading: "The opportunity",
          paragraphs: [
            "KitNation Nepal is a football apparel venture focused on bringing premium football club jerseys and fanwear to customers in Nepal.",
            "The venture curates and resells premium club jerseys across different levels of quality and experience — from fan versions designed for everyday wear to player-grade versions built closer to what professionals wear on the pitch.",
            "I saw an opportunity to make premium football apparel more accessible while creating a shopping experience that feels trustworthy, modern, and professional. From product selection and positioning to visual presentation, content, and customer experience, the focus is on building a destination for people who genuinely value football culture and quality apparel.",
            "The ambition is to build KitNation into a recognizable football lifestyle destination in Nepal, with a strong identity and the potential to grow beyond the local market.",
          ],
        },
        {
          heading: "My role",
          paragraphs: [
            "As Founder / Brand & Creative Director, I shape the vision, brand identity, and overall direction of KitNation Nepal. I focus on identifying product opportunities, understanding what football fans value, and positioning the venture in a way that feels distinctive and credible.",
            "From selecting the right products and defining how they are presented to developing the brand's visual language, content, and customer experience, I focus on turning the idea into a brand people recognize and trust.",
            "My role is to see what the brand can become before it exists — then shape the vision, define the direction, and turn that possibility into something real.",
          ],
        },
        {
          heading: "Where it stands",
          paragraphs: [
            "Established in 2026 and active. KitNation doesn't have a standalone site yet — its storefront currently sits under himallegacy.com. It has already shipped to customers in the United States and Australia alongside Nepal, and remains in its early growth stage.",
          ],
        },
      ],
      capabilities: {
        title: "Leadership Highlights",
        items: [
          "Brand Direction",
          "Creative Direction",
          "Product Positioning",
          "Product Storytelling",
          "E-Commerce Strategy",
          "Campaign Development",
          "Content & Social",
          "Meta Ads",
          "SEO & Digital Growth",
          "Customer Experience",
        ],
      },
      link: { label: "himallegacy.com", href: "https://himallegacy.com" },
    },
  ],
};

export const contact = {
  heading: "Let's connect",
  intro: "Open to conversations about aviation, brands, and building from Nepal.",
  email: "officialkunalshah@gmail.com",
  socialLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kunal-shah-589bb4346" },
  ],
};

export const footer = {
  tagline: "I fly. I build. I create.",
  email: "officialkunalshah@gmail.com",
  localTime: { enabled: true, timezone: "Asia/Kathmandu", label: "Kathmandu" },
  legalName: "Kunal Shah",
  year: "2026",
};
