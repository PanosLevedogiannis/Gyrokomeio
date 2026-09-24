/*
  Γυροκομείο Grill: site settings
  ------------------------------------------------------------------
  This is the file you edit most. Every text has a Greek (el) and an
  English (en) version. Save, refresh, done. No build step.
*/
window.SITE = {
  name: 'Γυροκομείο Grill',
  since: 2011,

  // While building: true shows labelled boxes where photos, reviews and
  // daily dishes will go. Set to false before going live.
  showPlaceholders: true,

  phones: [
    { label: { el: 'Κατάστημα', en: 'Shop' }, display: '27520 23600', tel: '+302752023600' }
    // Add a mobile the same way:
    // { label: { el: 'Κινητό', en: 'Mobile' }, display: '69X XXX XXXX', tel: '+3069XXXXXXXX' }
  ],
  email: 'gyrokomeio.grill@gmail.com',

  address: {
    el: 'Σιδηράς Μεραρχίας 5, Ναύπλιο 211 00',
    en: '5 Sidiras Merarchias St, Nafplio 211 00'
  },

  map: {
    // Their own Google Maps link (from the current site).
    link: 'https://maps.app.goo.gl/kaYg6ebHEtypM1dn9',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('Gyro-komeio, Σιδηράς Μεραρχίας 5, Ναύπλιο 211 00'),
    // Shown on the page all the time (lazy: it loads when you scroll near it).
    embed: 'https://maps.google.com/maps?q=' +
      encodeURIComponent('Gyro-komeio, Σιδηράς Μεραρχίας 5, Ναύπλιο 211 00') + '&z=17&hl=el&output=embed'
  },

  // Opening hours in Greek time. Monday first. A closing time earlier than
  // the opening time means "after midnight". Use null for a closed day.
  hours: {
    timezone: 'Europe/Athens',
    week: [
      { open: '12:00', close: '01:00' }, // Δευτέρα / Monday
      { open: '12:00', close: '01:00' }, // Τρίτη
      { open: '12:00', close: '01:00' }, // Τετάρτη
      { open: '12:00', close: '01:00' }, // Πέμπτη
      { open: '12:00', close: '01:00' }, // Παρασκευή
      { open: '12:00', close: '01:00' }, // Σάββατο
      { open: '12:00', close: '01:00' }  // Κυριακή / Sunday
    ],
    allYear: true
  },

  order: {
    wolt: {
      el: 'https://wolt.com/el/grc/nafplio/restaurant/gyrokomio-pol',
      en: 'https://wolt.com/en/grc/nafplio/restaurant/gyrokomio-pol'
    },
    efood: 'https://www.e-food.gr/delivery/nauplio/gyrokomeio'
  },

  social: {
    facebook: 'https://www.facebook.com/GyrokomeioGrill/',
    instagram: '' // e.g. 'https://www.instagram.com/...'
  },

  google: {
    // "All reviews" button. Their Google business link.
    reviews: 'https://share.google/NvQU7HK44YbP8tMDU',
    // "Write a review" button. Get it from Google Business Profile:
    // Home, "Ask for reviews", copy link. Leave empty to hide the button.
    writeReview: ''
  },

  // Contact form. FormSubmit is free and needs no account: the first message
  // sends a one-time activation email to this address. Click it once.
  // Empty string = the form opens the visitor's email app instead.
  contactForm: {
    endpoint: 'https://formsubmit.co/ajax/gyrokomeio.grill@gmail.com'
  },

  /*
    Daily dishes and offers. Newest first. Remove or comment out old ones.
    "until" (optional, YYYY-MM-DD) hides the card automatically after that day.
    "photo" (optional) points to a file in /images.

    {
      tag:   { el: 'Σήμερα', en: 'Today' },
      title: { el: 'Κοκορέτσι στη σούβλα', en: 'Kokoretsi off the spit' },
      text:  { el: 'Από τις 13:00, μέχρι να τελειώσει.', en: 'From 1pm until it runs out.' },
      until: '2026-10-04',
      photo: 'images/special-kokoretsi.jpg'
    },
  */
  specials: [
  ],

  /*
    Reviews: copy 3 to 6 REAL reviews from Google, word for word.
    { name: 'Μαρία Κ.', stars: 5, text: '...', when: { el: 'Αύγουστος 2026', en: 'August 2026' } },
  */
  reviews: [
    { name: 'Dancing Shadow', stars: 5, lang: 'el',
      text: 'Εξαιρετικό εστιατόριο! Δοκιμάσαμε γουρουνόπουλο και γύρο κοτόπουλο και ήταν όλα πραγματικά τέλεια. […]',
      when: { el: 'Σεπτέμβριος 2026', en: 'September 2026' } },
    { name: 'Fotis S.', stars: 5, lang: 'el',
      text: 'Από τα καλύτερα γυράδικα που έχουμε επισκεφθεί! […] Η μερίδα είναι τεράστια, χορταστική και γεμάτη με ποιοτικά, φρέσκα υλικά.',
      when: { el: 'Αύγουστος 2026', en: 'August 2026' } },
    { name: 'Παύλος Χ.', stars: 5, lang: 'el',
      text: 'Εξαιρετικό σε προϊόντα και τιμές αμεσότητα στην εξυπηρέτηση με ανθρώπους επαγγελματίες και με καλή διάθεση χαμογελαστους και εύκολη πρόσβαση',
      when: { el: 'Μάιος 2026', en: 'May 2026' } },
    { name: 'Monica P.', stars: 5, lang: 'el',
      text: 'Αν βρεθείτε Ναύπλιο, αξίζει 100%! Πολύ όμορφος και προσεγμένος χώρος, με εξαιρετικό φαγητό και καλές τιμές. […]',
      when: { el: 'Μάιος 2026', en: 'May 2026' } },
    { name: 'Niki B.', stars: 5, lang: 'el',
      text: '[…] Αν και σε ώρα αιχμής χωρίς κράτηση δεν περιμέναμε καθόλου!! Το προσωπικό ήταν ευγενέστατο και η ατμόσφαιρα πολύ φιλική με ωραία μουσική! […]',
      when: { el: 'Απρίλιος 2026', en: 'April 2026' } },
    { name: 'Stavros G.', stars: 5, lang: 'el',
      text: 'Ένας εξαιρετικός προορισμός για να δοκιμάσει κανείς ελληνικά σουβλάκια! […]',
      when: { el: 'Νοέμβριος 2025', en: 'November 2025' } }
  ],

  /*
    Photo slots. Drop a photo into /images with exactly this file name and it
    appears on the site. Until then the site shows a placeholder (or hides the
    slot if showPlaceholders is false). Shot list: images/README.md
  */
  photos: {
    hero: {
      file: 'images/hero.jpg',
      alt: { el: 'Ο γύρος στη σούβλα, από κοντά', en: 'Gyros turning on the spit, close up' },
      hint: { el: 'Ο γύρος στη σούβλα, από κοντά', en: 'Gyros on the spit, close up' },
      ratio: '4:5'
    },
    story: {
      file: 'images/story.jpg',
      alt: { el: 'Το γωνιακό μας μαγαζί με τη φωτεινή ταμπέλα', en: 'Our corner shop with its lit-up sign' },
      hint: { el: 'Το μαγαζί απ’ έξω, το σούρουπο, με αναμμένη την ταμπέλα', en: 'The shop front at dusk, sign lit up' },
      ratio: '4:3'
    },
    gallery: [
      { file: 'images/gallery-01.jpg', shape: 'tall',
        alt: { el: 'Πίτα γύρος χοιρινό με όλα', en: 'Pork gyros pita with everything' },
        hint: { el: 'Πίτα γύρος στο χέρι, από κοντά', en: 'Gyros pita in hand, close up' } },
      { file: 'images/gallery-02.jpg', shape: 'square',
        alt: { el: 'Καλαμάκια στη σχάρα', en: 'Skewers on the grill' },
        hint: { el: 'Καλαμάκια στη σχάρα, με λίγο καπνό', en: 'Skewers on the grill, a little smoke' } },
      { file: 'images/gallery-03.jpg', shape: 'square',
        alt: { el: 'Ποικιλία για παρέα', en: 'Mixed grill platter to share' },
        hint: { el: 'Ποικιλία ή Mix Grill από ψηλά', en: 'Platter or Mix Grill from above' } },
      { file: 'images/gallery-04.jpg', shape: 'wide',
        alt: { el: 'Τα τραπέζια μας στην πλατεία', en: 'Our tables on the square' },
        hint: { el: 'Τραπέζια στην πλατεία, καλοκαίρι, σούρουπο', en: 'Tables on the square, summer, dusk' } },
      { file: 'images/gallery-05.jpg', shape: 'tall',
        alt: { el: 'Ο ψήστης στη δουλειά', en: 'Our grill master at work' },
        hint: { el: 'Χέρια του ψήστη πάνω από τη σχάρα', en: 'Grill master’s hands over the grill' } },
      { file: 'images/gallery-06.jpg', shape: 'square',
        alt: { el: 'Το Gyroκομείο burger', en: 'The Gyrokomeio burger' },
        hint: { el: 'Gyroκομείο burger, από κοντά', en: 'Gyrokomeio burger, close up' } },
      { file: 'images/gallery-07.jpg', shape: 'square',
        alt: { el: 'Τζατζίκι, τυροκαυτερή και χωριάτικη', en: 'Tzatziki, tirokafteri and Greek salad' },
        hint: { el: 'Ορεκτικά και σαλάτα στο τραπέζι', en: 'Dips and salad on the table' } },
      { file: 'images/gallery-08.jpg', shape: 'wide',
        alt: { el: 'Ο χώρος μας μέσα', en: 'Inside the shop' },
        hint: { el: 'Ο εσωτερικός χώρος, φαρδιά λήψη', en: 'Inside the shop, wide shot' } }
    ]
  }
};
