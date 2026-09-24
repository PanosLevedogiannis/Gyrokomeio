/*
  Texts / Κείμενα
  ------------------------------------------------------------------
  Greek text lives in index.html. English for the same spots lives in
  I18N.en, keyed by each element's data-i18n (or data-i18n-attr) name.
  I18N.js holds strings that the scripts build, in both languages.
*/
window.I18N = {
  en: {
    'skip': 'Skip to content',
    'nav.label': 'Main menu',
    'nav.menu': 'Menu',
    'nav.specials': 'Daily dishes',
    'nav.story': 'Our story',
    'nav.photos': 'Photos',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'nav.open': 'Open menu',
    'lang.label': 'Language',

    'cta.call': 'Call',
    'cta.menu': 'See the menu',
    'cta.order': 'Order',
    'cta.directions': 'Directions',

    'hero.kicker': 'Gyrokomeio Grill, a grill house in Nafplio.',
    'hero.order': '“One gyros pita, please.”',
    'hero.ingLabel': 'What «με όλα» means',
    'ing.tomato': 'tomato',
    'ing.onion': 'onion',
    'ing.tzatziki': 'tzatziki',
    'ing.fries': 'fries',
    'hero.lede': '“Me óla?” means “with everything?”. Our counter’s question since 2011, in the heart of Nafplio.',

    'quick.label': 'Quick info',
    'quick.hours': 'Opening hours',
    'quick.address': 'Address',
    'quick.phone': 'Phone',
    'quick.phoneSub': 'For orders and questions',
    'quick.delivery': 'Delivery',
    'quick.deliveryValue': 'In and around Nafplio',

    'specials.title': 'Daily dishes and offers',

    'menu.title': 'Menu',
    'menu.lede': 'From gyros pita to tomahawk steak. Pick a category.',
    'menu.tabsLabel': 'Menu categories',
    'menu.allergens': 'Allergies or intolerances? Tell us before you order and we’ll tell you what’s in each dish.',

    'order.title': 'Order',
    'order.online': 'Order online',
    'order.text': 'Delivery in and around Nafplio, minimum order applies. Or grab it to go from the counter.',

    'story.title': 'Why Gyrokomeio?',
    'story.p1': 'Gyros plus <span lang="el">γηροκομείο</span>, the Greek word for a retirement home. The pun has stuck with us since we opened on this corner of Nafplio in July 2011: this is where gyros spends its golden years.',
    'story.p2': 'In our first week we handed out free souvlaki so our customers could choose which supplier we’d buy our meat from.',
    'story.kitchenTitle': 'In our kitchen',
    'story.f1': 'Local extra virgin olive oil in our salads and cooking',
    'story.f2': 'Greek PDO feta',
    'story.f3': 'Tzatziki, tirokafteri and starters we make ourselves every day',
    'story.f4': 'Fresh potatoes, peeled in the shop every day',
    'story.f5': 'Handmade 110 g skewers',
    'story.p3': 'In summer our tables go out onto the square across the street. We’re open every day, all year round.',

    'photos.title': 'Photos',

    'reviews.title': 'Reviews',
    'reviews.lede': 'What people write about us on Google.',
    'reviews.all': 'All reviews on Google',
    'reviews.write': 'Write a review',

    'contact.title': 'Contact',
    'contact.mapTitle': 'Map: Gyrokomeio Grill, 5 Sidiras Merarchias, Nafplio',
    'contact.allYear': 'All year round',
    'contact.follow': 'Follow us',

    'form.title': 'Send us a message',
    'form.intro': 'For group and event orders, questions or feedback. To order right now, give us a call.',
    'form.name': 'Name',
    'form.errName': 'Enter your name.',
    'form.contact': 'Phone or email',
    'form.errContact': 'Enter a phone number or email so we can reply.',
    'form.topic': 'Topic',
    'form.tQuestion': 'Question',
    'form.tGroup': 'Group or event order',
    'form.tFeedback': 'Feedback',
    'form.message': 'Message',
    'form.errMessage': 'Write your message.',
    'form.send': 'Send message',
    'form.privacy': 'We only use your details to reply to you.',

    'footer.privacy': 'Privacy',
    'footer.tagline': 'Grill house in Nafplio since 2011.',
    'footer.visit': 'Visit us',
    'footer.contact': 'Contact',
    'footer.order': 'Order',

    'bar.label': 'Quick actions',

    'sheet.title': 'How would you like to order?',
    'sheet.phone': 'By phone',
    'sheet.app': 'Order in the app',
    'sheet.note': 'Delivery in and around Nafplio, minimum order applies.',
    'close': 'Close',

    'privacy.title': 'Privacy',
    'privacy.body': '<p>We use no tracking cookies and no advertising tools. It only remembers the language you picked, in your own browser.</p><p>The Contact section shows a Google Maps map. When it loads, Google may receive data under its own privacy policy.</p><p>Messages from the form go through the FormSubmit service to our email. We only use them to reply to you.</p><p>Questions about any of this: gyrokomeio.grill@gmail.com</p>',

    'lightbox.label': 'Photo',
    'lightbox.prev': 'Previous photo',
    'lightbox.next': 'Next photo'
  },

  js: {
    'meta.title': {
      el: 'Γυροκομείο Grill | Ψητοπωλείο στο Ναύπλιο: γύρος, σουβλάκι, σχάρα',
      en: 'Gyrokomeio Grill | Grill house in Nafplio: gyros, souvlaki, grill'
    },
    'meta.desc': {
      el: 'Γύρος, χειροποίητα καλαμάκια, κεμπάπ και ψητά της σχάρας στο κέντρο του Ναυπλίου από το 2011. Delivery, take away και τραπέζια στην πλατεία. Κάθε μέρα 12:00 έως 01:00.',
      en: 'Gyros, handmade skewers, kebab and grill plates in the heart of Nafplio since 2011. Delivery, takeaway and tables on the square. Every day 12:00 to 01:00.'
    },
    'nav.open': { el: 'Άνοιγμα μενού', en: 'Open menu' },
    'nav.close': { el: 'Κλείσιμο μενού', en: 'Close menu' },

    'days': {
      el: ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'],
      en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    'daysOn': {
      el: ['τη Δευτέρα', 'την Τρίτη', 'την Τετάρτη', 'την Πέμπτη', 'την Παρασκευή', 'το Σάββατο', 'την Κυριακή'],
      en: ['on Monday', 'on Tuesday', 'on Wednesday', 'on Thursday', 'on Friday', 'on Saturday', 'on Sunday']
    },
    'hours.everyDay': { el: 'Κάθε μέρα {open} έως {close}', en: 'Every day {open} to {close}' },
    'hours.range': { el: '{open} έως {close}', en: '{open} to {close}' },
    'hours.closed': { el: 'Κλειστά', en: 'Closed' },
    'status.open': { el: 'Ανοιχτά τώρα, έως {close}', en: 'Open now, until {close}' },
    'status.soon': { el: 'Κλείνουμε σε λίγο, έως {close}', en: 'Closing soon, open until {close}' },
    'status.today': { el: 'Κλειστά τώρα. Ανοίγουμε στις {open}', en: 'Closed now. We open at {open}' },
    'status.tomorrow': { el: 'Κλειστά τώρα. Ανοίγουμε αύριο στις {open}', en: 'Closed now. We open tomorrow at {open}' },
    'status.on': { el: 'Κλειστά τώρα. Ανοίγουμε {day} στις {open}', en: 'Closed now. We open {day} at {open}' },

    'specials.empty': {
      el: 'Κάθε μέρα έχουμε και πιάτα ημέρας. Πάρε τηλέφωνο να μάθεις τι ψήνεται σήμερα.',
      en: 'We cook daily dishes too. Give us a call to hear what’s on today.'
    },
    'specials.until': { el: 'Ισχύει έως {date}', en: 'Until {date}' },
    'specials.slot': { el: 'Θέση για πιάτο ημέρας ή προσφορά', en: 'Space for a daily dish or offer' },
    'specials.slotHow': { el: 'Πρόσθεσέ το στο js/config.js, στο specials.', en: 'Add it in js/config.js, under specials.' },

    'reviews.slot': { el: 'Θέση για πραγματική κριτική από το Google', en: 'Space for a real Google review' },
    'reviews.slotHow': { el: 'Αντίγραψέ την αυτούσια στο js/config.js, στο reviews.', en: 'Copy it word for word into js/config.js, under reviews.' },
    'reviews.stars': { el: '{n} από 5 αστέρια', en: '{n} out of 5 stars' },
    'reviews.source': { el: 'Κριτική στο Google, {when}', en: 'Google review, {when}' },

    'photo.slot': { el: 'Φωτογραφία: {hint}', en: 'Photo: {hint}' },
    'photo.file': { el: 'Αρχείο {file}, αναλογία {ratio}', en: 'File {file}, ratio {ratio}' },
    'photo.open': { el: 'Άνοιγμα φωτογραφίας: {alt}', en: 'Open photo: {alt}' },

    'tag.veg': { el: 'Χορτοφαγικό', en: 'Vegetarian' },
    'tag.home': { el: 'Χειροποίητο', en: 'Homemade' },
    'tag.share': { el: 'Για παρέα', en: 'To share' },
    'tag.house': { el: 'Του σπιτιού', en: 'House special' },
    'menu.legend': {
      el: 'Τα πιάτα με την ένδειξη «Χορτοφαγικό» δεν έχουν κρέας ή ψάρι.',
      en: 'Dishes marked Vegetarian contain no meat or fish.'
    },

    'form.sending': { el: 'Αποστολή…', en: 'Sending…' },
    'form.sent': { el: 'Το μήνυμα στάλθηκε. Θα σου απαντήσουμε σύντομα.', en: 'Message sent. We’ll get back to you soon.' },
    'form.failed': {
      el: 'Το μήνυμα δεν στάλθηκε. Δοκίμασε ξανά ή πάρε μας τηλέφωνο στο {phone}.',
      en: 'Your message didn’t go through. Try again, or call us on {phone}.'
    },
    'form.mailto': {
      el: 'Άνοιξε η εφαρμογή email σου με το μήνυμα έτοιμο. Πάτα αποστολή από εκεί.',
      en: 'Your email app opened with the message ready. Hit send there.'
    },
    'form.mailtoLink': { el: 'Στείλ’ το με email', en: 'Send it by email' },
    'form.subject': { el: 'Μήνυμα από το site: {topic}', en: 'Website message: {topic}' }
  }
};
