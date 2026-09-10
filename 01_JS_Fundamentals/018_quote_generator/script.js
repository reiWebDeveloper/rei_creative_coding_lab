const quotes = {
      business: [
        { text: "Broadway is the only art form where the audience decides whether you eat.", author: "Unknown Producer", tag: "The Business of the Stage" },
        { text: "Theater is a $2 billion industry built almost entirely on hope and a rehearsal period.", author: "Ken Davenport", tag: "The Business of the Stage" },
        { text: "Every show is a startup. You raise money, you hire talent, you open, and you live or die by the market.", author: "Anonymous General Manager", tag: "The Business of the Stage" },
        { text: "The economics of Broadway are simple: the risk is enormous and the return is never guaranteed. The mystery is why we keep coming back.", author: "Rocco Landesman", tag: "The Business of the Stage" },
      ],
      craft: [
        { text: "The process you go through to make a piece of theater is the theater.", author: "Stephen Sondheim", tag: "Artists on Craft" },
        { text: "I don't want to make money. I want to make something.", author: "Jonathan Larson", tag: "Artists on Craft" },
        { text: "You do your best work after your biggest failures.", author: "Patti LuPone", tag: "Artists on Craft" },
        { text: "Every night is opening night. That's the terrifying, beautiful truth of live performance.", author: "Audra McDonald", tag: "Artists on Craft" },
      ],
      audience: [
        { text: "Theater is the only place where the audience and the artist share the same air, the same risk, the same moment.", author: "Peter Brook", tag: "On Audiences" },
        { text: "When the house goes dark and the curtain rises, something electric passes between stage and seat. That charge is what we work for.", author: "Harold Prince", tag: "On Audiences" },
        { text: "The audience completes the play. Without them, it's just rehearsal.", author: "Unknown", tag: "On Audiences" },
        { text: "Broadway audiences are the toughest and most generous in the world. They paid $200 to believe in you.", author: "Anonymous Performer", tag: "On Audiences" },
      ],
      hustle: [
        { text: "Most Broadway actors have a second job. The great ones treat both jobs like their only job.", author: "Unknown", tag: "Hustle & Survival" },
        { text: "The audition never ends. You're always proving you deserve to be here.", author: "Anonymous Broadway Actor", tag: "Hustle & Survival" },
        { text: "Survival in this industry is itself a form of artistry.", author: "Lin-Manuel Miranda", tag: "Hustle & Survival" },
        { text: "There is no overnight success on Broadway. There is only overnight visibility after years of invisible work.", author: "Unknown", tag: "Hustle & Survival" },
      ],
    };
 
    let currentIndex = {};
 
    function getCurrentTopic() {
      return document.getElementById('topicSelect').value;
    }
 
    function showQuote(animate) {
      const topic = getCurrentTopic();
      const pool = quotes[topic];
      const idx = currentIndex[topic] ?? 0;
      const q = pool[idx];
      const textEl = document.getElementById('quoteText');
 
      if (animate) {
        textEl.classList.add('fading');
        setTimeout(() => {
          textEl.textContent = '\u201C' + q.text + '\u201D';
          document.getElementById('quoteAuthor').textContent = '— ' + q.author;
          document.getElementById('quoteTag').textContent = q.tag;
          document.getElementById('counter').textContent = (idx + 1) + ' / ' + pool.length;
          textEl.classList.remove('fading');
        }, 260);
      } else {
        textEl.textContent = '\u201C' + q.text + '\u201D';
        document.getElementById('quoteAuthor').textContent = '— ' + q.author;
        document.getElementById('quoteTag').textContent = q.tag;
        document.getElementById('counter').textContent = (idx + 1) + ' / ' + pool.length;
      }
    }
 
    function nextQuote() {
      const topic = getCurrentTopic();
      const pool = quotes[topic];
      currentIndex[topic] = ((currentIndex[topic] ?? 0) + 1) % pool.length;
      showQuote(true);
    }
 
    function onTopicChange() {
      showQuote(true);
    }
 
    function copyQuote() {
      const topic = getCurrentTopic();
      const idx = currentIndex[topic] ?? 0;
      const q = quotes[topic][idx];
      const text = '\u201C' + q.text + '\u201D\n\u2014 ' + q.author;
      navigator.clipboard.writeText(text).catch(() => {});
      const btn = document.getElementById('copyBtn');
      btn.textContent = 'Copied \u2713';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
    }
 
    showQuote(false);