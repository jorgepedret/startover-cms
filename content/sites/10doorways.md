---
title: 10 Doorway
slug: 10doorways
blocks:
  - height: 100vh
    backgroundType: color
    image: ''
    backgroundColor: '#FF4A4A'
    overlayColor: '#1E1A1A'
    overlayOpacity: 50
    title: 10 Doorways
    subtitle: Open Your Possibilities
    primaryButton:
      label: See Doorways
      url: '#doorways'
    secondaryButton:
      label: Get me out of here
      url: 'https://www.youtube.com/watch?v=vgLaU-NJ2pI'
    showInNav: true
    navLabel: Home
    _template: hero
  - layout: text-right
    title: Discovering your next step
    subtitle: Simple Text Component Sample
    body: |
      Each door represents a path to transformation and growth. Choose your journey.
    images:
      - src: /uploads/sebastian-herrmann-AY3cdYQJ4xU-unsplash.jpg
    showInNav: true
    navLabel: Introduction
    _template: textSection
  - title: Our Doors Gallery
    displayMode: masonry
    columns: auto
    navigation: both
    images:
      - src: /uploads/jordan-duca-fwDYmd0DADo-unsplash.jpg
        alt: Many doors
        caption: Many doors
        titleOverlay: Many doors
      - src: /uploads/moren-hsu-VLaKsTkmVhk-unsplash.jpg
      - src: /uploads/runnyrem-LfqmND-hym8-unsplash.jpg
      - src: /uploads/sebastian-herrmann-AY3cdYQJ4xU-unsplash.jpg
      - src: /uploads/will-ma-r5Jzqbcnn7E-unsplash.jpg
    showInNav: true
    navLabel: Gallery
    _template: gallery
  - mediaType: image
    image: /uploads/20230508_201343.jpg
    height: 75vh
    overlayColor: '#101010'
    overlayOpacity: 30
    title: Friends & Colleagues
    subtitle: This is the Big Media component.
    primaryButton:
      label: Follow the Trail
      url: 'https://startover.xyz/'
    secondaryButton:
      label: Discover the Teams
      url: 'https://yourteams.startover.world'
    showInNav: true
    navLabel: ''
    _template: bigMedia
  - layout: horizontal
    title: Your Teams
    intro: |
      How would this work if you had some **interesting text**
    items:
      - mediaType: image
        image: /uploads/jordan-duca-fwDYmd0DADo-unsplash.jpg
        title: Omelette Du Fromage
        description: What is your favorite meal?
      - mediaType: image
        icon: ''
        image: /uploads/moren-hsu-VLaKsTkmVhk-unsplash.jpg
        title: The Raging Wilderbeasts
        description: Raaaaaaage
      - mediaType: image
        image: /uploads/sebastian-herrmann-AY3cdYQJ4xU-unsplash.jpg
        title: As many
        description: As many items like this as you please
    _template: featureList
  - layout: cards-grid
    title: Testimonials
    intro: |
      What people say about these doorways.
    items:
      - quote: |
          Frankly. The best doorways ever.
        authorName: John Wayne
        authorTitle: Die Hard
        authorPhoto: /uploads/514525331_10161172821901245_6674622684922634047_n.jpg
        companyLogo: ''
        rating: 5
      - quote: |
          These are my people. For my whole life I've been looking for these doorways and I almost couldn't believe it. Some more bullshit here to make it look longer and more impactful. The real change came after the 5th doorway, I was knee deep in my swamp when all of a sudden I realied something: It's all bullshit.
        authorName: A Man's Bullshit
        authorTitle: Team-A
        authorPhoto: /uploads/20251028_101319.jpg
    showInNav: true
    _template: testimonials
  - layout: row
    columns: auto
    title: Statistics Don't Lie
    intro: |
      Or do they? Results don't lie.
    items:
      - number: '700'
        label: Websites
        mediaType: icon
        icon: ''
      - number: '+4000'
        label: Experiments to try
      - number: '50'
        label: Years of Empirical Research
      - number: '2000'
        label: Players
        mediaType: none
        image: ''
    showInNav: true
    navLabel: Stats
    _template: stats
  - title: Stay Connected
    intro: |
      Signup to receive our newsletter every time directly in your inbox
    showNameField: false
    submitLabel: Signup
    submitColor: '#5E88B4'
    submitStyle: filled
    successAction: message
    successMessage: Thank you for signing up
    showInNav: true
    _template: signupForm
  - title: Subscribe on Substack
    intro: |
      Food for your Heart, Soul and Mind
    width: contained
    heightType: auto
    heightPx: -2
    html: '<iframe src="https://jorgepedret.substack.com/embed" width="480" height="320" style="border: 1px solid #EEE; background: white" frameborder="0" scrolling="no"></iframe>'
    showInNav: false
    _template: htmlEmbed
  - title: Contact Us
    intro: |
      Get in touch with us through this form
    showNameField: true
    nameRequired: true
    nameFieldLabel: Name
    emailFieldLabel: Email
    showSubjectField: true
    subjectRequired: true
    subjectFieldLabel: What is it aboug?
    subjectType: dropdown
    subjectOptions:
      - option: Question
      - option: Request
      - option: Message
    messageFieldLabel: Message
    submitLabel: Send it Our Way
    _template: contactForm
---

