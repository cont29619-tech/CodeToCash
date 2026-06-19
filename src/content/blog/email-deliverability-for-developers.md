---
title: 'Email Deliverability for Developers: Why Your Emails Land in Spam'
seoTitle: "Email Deliverability for Developers: Avoid Spam"
description: 'You can write the perfect email sequence and still fail if it lands in spam. Here is the technical and content side of deliverability — SPF, DKIM, DMARC, warmup, and the rules that keep you in the inbox.'
pubDate: 2026-06-12
author: 'CodeToCash Team'
category: 'email'
tags: ['email deliverability', 'spf', 'dkim', 'dmarc', 'email marketing', 'inbox']
readingTime: '11 min read'
featured: false
draft: false
faq:
  - question: 'Why are my emails going to spam even though they look fine?'
    answer: "Content is only part of the picture. The most common cause of spam placement is missing or broken email authentication — SPF, DKIM, and DMARC records that prove you are allowed to send from your domain. Without them, mailbox providers treat your mail as suspicious by default. Other frequent causes: a brand-new sending domain with no reputation, sending to old or purchased lists that generate spam complaints, and spam-trigger words or spammy formatting in the email itself. Fix authentication first — it's the highest-impact, most-overlooked factor."
  - question: 'What are SPF, DKIM, and DMARC in plain terms?'
    answer: "They're three DNS records that together prove your email is legitimate. SPF (Sender Policy Framework) lists which servers are allowed to send mail for your domain. DKIM (DomainKeys Identified Mail) adds a cryptographic signature so receivers can verify the message wasn't forged or tampered with. DMARC ties them together and tells receiving servers what to do if a message fails SPF or DKIM — and sends you reports on who's sending mail as you. Modern providers like Gmail and Yahoo now effectively require all three for bulk senders."
  - question: 'Do I need to warm up a new email domain before sending?'
    answer: "Yes, if you're sending any meaningful volume. A brand-new domain or IP has no sending reputation, and blasting thousands of emails on day one is the single fastest way to get flagged as spam. Warmup means gradually increasing volume over two to four weeks — start with small batches to your most engaged contacts, build positive signals (opens, replies, no complaints), and scale up as your reputation establishes. Many email platforms automate this. Skipping warmup can poison a domain's reputation for months."
  - question: 'Does my email marketing platform handle deliverability for me?'
    answer: "Partly. A good platform (ConvertKit, Buttondown, Loops, and similar) manages the sending infrastructure, IP reputation, and bounce handling, which removes a lot of the technical burden. But it cannot fix authentication on your domain — you still have to add SPF, DKIM, and DMARC records in your DNS, usually by following the platform's setup instructions. And no platform can fix bad list hygiene or spammy content. The platform handles the plumbing; you're responsible for your domain setup, your list, and what you send."
  - question: 'How do I check if my emails are actually landing in the inbox?'
    answer: "Don't trust your own inbox as the only test — providers treat mail to your own domain differently. Use a seed-test tool (Mail-Tester or your platform's inbox-placement testing) that sends to addresses across Gmail, Outlook, Yahoo, and Apple Mail and reports where you landed plus an authentication score. Also monitor your real metrics: a sudden drop in open rate, especially at one provider, is an early warning that your deliverability is slipping. Check authentication with the platform's diagnostics or a tool like MXToolbox."
---

You can write the best email sequence of your life — the perfect [subject lines](/blog/email-subject-line-formulas), a flawless [onboarding flow](/blog/developer-onboarding-email-sequence), copy that would convert a stone — and none of it matters if the email lands in spam. An email nobody sees has a zero percent conversion rate no matter how good it is.

This is the part of email marketing that gets skipped because it feels like infrastructure, not marketing. And that is exactly why it's an advantage for developers: deliverability is a technical problem, and you are technical. While other founders agonize over button colors, you can fix the DNS records that determine whether their emails get read at all.

Deliverability is the discipline of getting your email into the inbox instead of the spam folder or the void. It has two halves: a *technical* half (proving you are who you say you are) and a *content and behavior* half (sending mail people actually want). This guide covers both, in developer terms, so the email program you build on top of the [email sequences for SaaS](/blog/email-sequences-for-saas) framework actually reaches human eyes.

## The Mental Model: Deliverability Is a Trust Score

Mailbox providers — Gmail, Outlook, Apple Mail, Yahoo — are constantly deciding one thing about every message: *do we trust this sender enough to put this in the inbox?* Everything in this guide is about raising that trust score.

Trust is built from three inputs:

1. **Identity** — can the provider verify you actually sent this, and that you're allowed to send from your domain? (Authentication: SPF, DKIM, DMARC.)
2. **Reputation** — does mail from your domain and IP have a history of being wanted? (Warmup, complaint rates, bounce rates.)
3. **Engagement** — do recipients open, read, and reply, or do they ignore, delete, and mark as spam? (List quality and content.)

Fail any one badly and you land in spam. The good news: all three are within your control, and most senders fail on the first one — identity — which is also the easiest to fix permanently.

## The Technical Half: SPF, DKIM, and DMARC

These three DNS records are the price of admission. As of 2024, Gmail and Yahoo formally require all three for bulk senders, and other providers treat their absence as a strong spam signal. If you set up nothing else from this guide, set up these.

**SPF — who is allowed to send.** SPF is a DNS TXT record listing the servers authorized to send email for your domain. When a receiving server gets your email, it checks whether the sending server is on your list. If your email platform sends on your behalf, your SPF record must include them.

```
SPF — a DNS TXT record on your domain
─────────────────────────────────────
Type:  TXT
Host:  @  (your root domain)
Value: v=spf1 include:_spf.yourprovider.com ~all

  • "include:" authorizes your email provider's servers
  • "~all" = soft-fail anything not listed (recommended start)
  • You can have only ONE SPF record — merge includes if you
    use multiple senders (e.g., marketing + transactional)
```

**DKIM — proof it wasn't forged.** DKIM adds a cryptographic signature to every message using a private key your email provider holds; the matching public key lives in your DNS. The receiving server uses the public key to verify the message genuinely came from you and wasn't altered in transit. Your email platform generates the key and tells you the exact DNS record to add — usually a `CNAME` or `TXT` record at a specific selector.

**DMARC — the policy that ties it together.** DMARC tells receiving servers what to do when a message *fails* SPF or DKIM, and — critically — sends you reports about who is sending email claiming to be your domain. Start in monitoring mode so you can see what's happening before you start rejecting mail.

```
DMARC — a DNS TXT record at _dmarc.yourdomain
─────────────────────────────────────────────
Type:  TXT
Host:  _dmarc
Value: v=DMARC1; p=none; rua=mailto:you@yourdomain.com

  • "p=none"  = monitor only (start here — break nothing)
  • "rua="    = where to send aggregate reports
  • Once you've confirmed your legit mail passes, tighten to
    "p=quarantine" then "p=reject" to block spoofers
```

The recommended rollout: add SPF and DKIM, then add DMARC with `p=none` and watch the reports for a couple of weeks. Once you've confirmed all your legitimate mail (marketing platform, transactional emails, anything sending as you) passes authentication, tighten the DMARC policy to `quarantine` and eventually `reject`. This sequence protects your domain from spoofers without accidentally blocking your own mail.

One more identity rule that matters: send marketing email from a subdomain (like `news.yourdomain.com`) rather than your root domain. If a campaign ever damages your sending reputation, it stays isolated from the root domain you use for critical transactional and personal mail.

## The Reputation Half: Warmup and Sending Behavior

Authentication proves *who* you are. Reputation answers *should we trust your history?* A brand-new sending domain has no history, and the worst thing you can do with a fresh domain is blast ten thousand emails on day one. That pattern looks exactly like a spammer, and providers will treat you like one — sometimes for months.

**Warm up gradually.** Start small and scale volume over two to four weeks. Send your first batches to your most engaged contacts — the people most likely to open and reply — because positive engagement early teaches providers that your mail is wanted.

```
DOMAIN WARMUP SCHEDULE (rough guide)
════════════════════════════════════

Week 1:  Send to your 50-100 most engaged subscribers.
         Aim for high open/reply rates, zero complaints.

Week 2:  Scale to a few hundred. Watch your metrics —
         opens steady, complaints near zero? Keep going.

Week 3:  Scale to low thousands if engagement holds.

Week 4+: Approach full volume. Reputation is established.

Rule: if complaint rate climbs or opens drop sharply,
STOP scaling and investigate before doing more damage.
```

Many email platforms automate warmup for you. If yours does, follow its guidance rather than overriding it.

**Watch the two numbers that wreck reputation:**

- **Complaint rate** (people hitting "mark as spam"). Keep it below 0.1% — that's one complaint per thousand emails. Above 0.3% and providers start routing you to spam by default. The fastest way to spike complaints is emailing people who don't remember signing up, which is why purchased and scraped lists are poison.
- **Bounce rate** (emails to dead addresses). High bounce rates signal a low-quality list. Remove hard bounces immediately and use double opt-in so only real, intentional addresses enter your list in the first place.

This is where list hygiene becomes a deliverability tool, not just a courtesy. The patient, opt-in list-building approach in the [developer newsletter growth guide](/blog/developer-newsletter-growth) isn't just nicer — it's what keeps you in the inbox. A clean list of people who genuinely want your email is the single biggest reputation asset you can own.

## The Content Half: Don't Look Like Spam

Even with perfect authentication and reputation, the email itself can trip filters. Content signals matter — though far less than founders fear, and far less than authentication. The [email subject line tester](/tools/email-subject-line-tester) catches the worst offenders, but here are the principles.

**Avoid the obvious spam triggers.** Filters react to the patterns of bulk junk: ALL CAPS, excessive exclamation points, "FREE!!!", "ACT NOW," "100% guaranteed," walls of red and yellow, and `$$$`. You probably aren't writing like a 2005 spammer — but check your subject lines and first lines specifically, where filters scrutinize hardest.

**Balance your text-to-image ratio.** An email that is one giant image with almost no text is a classic spam pattern. Lead with real text. For developer audiences this is easy — your readers prefer plain, text-forward emails to heavy HTML templates anyway, and plain text both converts better and deliverers better. This is one of the rare cases where the easier thing is also the better thing.

**Authenticate your links and don't use shorteners.** Link shorteners (bit.ly and friends) are heavily used by spammers and hurt deliverability. Link to your own domain. And make sure your "from" name and address are consistent across sends — providers track sender identity, and changing it constantly looks evasive.

**Always include a working unsubscribe.** Beyond being legally required (CAN-SPAM, GDPR), a visible one-click unsubscribe is a deliverability *asset*. Counterintuitively, making it easy to leave reduces spam complaints — people who can't find the unsubscribe button just hit "mark as spam" instead, which hurts you far more than a clean unsubscribe ever could.

## Monitoring: Know Before Your Open Rate Tells You

Deliverability decays silently. By the time your open rate visibly drops, you've already been landing in spam for a while. Set up monitoring so you catch problems early — the same instinct behind tracking [north star metrics](/blog/north-star-metrics-saas), applied to your inbox placement.

**Seed-test before big sends.** Tools like Mail-Tester send your email through a checklist and report your authentication status, spam-trigger score, and likely placement across major providers. Run one before any significant campaign. Don't rely on sending to your own inbox — providers treat mail to your own domain differently than mail to strangers.

**Watch open rate by provider.** If your overall open rate is fine but Gmail specifically craters, that's a provider-specific reputation problem, not a content problem. Segmenting open rate by mailbox provider turns a vague "deliverability feels off" into a precise diagnosis.

**Read your DMARC reports.** Those `rua` reports you set up earlier will show you every source sending mail as your domain — including ones you forgot about (your old transactional service, a form plugin) and ones that are spoofing you. Both can damage your reputation, and the reports are how you find them.

## FAQ: Email Deliverability for Developers

**Is deliverability something I set up once, or do I have to maintain it?**

Authentication (SPF, DKIM, DMARC) is mostly set-and-forget — configure it once and revisit only when you change email providers or add a new sending service. Reputation and list hygiene are ongoing: you have to keep your list clean, remove bounces, honor unsubscribes, and watch your complaint rate continuously. Think of authentication as the foundation you pour once and reputation as the garden you tend forever. Most deliverability problems that appear "suddenly" are reputation issues that built up quietly over time.

**Can one bad email campaign ruin my deliverability permanently?**

It can do real damage, but rarely permanent damage if you respond. Sending to a stale or purchased list and triggering a wave of spam complaints can tank your domain's reputation for weeks to months. The recovery is the same as the prevention: stop sending to unengaged contacts, clean your list aggressively, send only to people who actively engage, and rebuild positive signals slowly — essentially a re-warmup. This is exactly why list hygiene and warmup matter *before* you have a problem, not after.

**Do these rules apply to transactional emails too (password resets, receipts)?**

Yes — authentication applies to every email your domain sends, transactional included. In fact, transactional email is even more critical to get right because a password reset landing in spam directly breaks your product. The good news is transactional email usually has excellent deliverability naturally, because recipients expect it and engage with it immediately. Just make sure your transactional sending service is included in your SPF record and properly signs with DKIM, and keep it on a separate subdomain from marketing so a marketing reputation problem never blocks a password reset.

## Fix Your Authentication This Week

The highest-leverage hour you can spend on email marketing isn't writing copy — it's adding three DNS records. If you've never set up SPF, DKIM, and DMARC, that's almost certainly why a chunk of your email is invisible, and it's a one-time fix with permanent payoff.

Here's the order: log into your email platform and follow its authentication setup to add SPF and DKIM to your DNS. Add a DMARC record with `p=none` and a reporting address. Run a seed test to confirm everything passes. Then, if you're sending real volume from a fresh domain, warm it up gradually instead of blasting.

Do that, keep your list clean and opt-in, and write text-forward emails people actually want — and you'll spend your effort where it counts: on the message, knowing it will actually be seen.

For the email sequences worth delivering once you've fixed delivery, work through the [email launch sequence playbook](/playbooks/email-launch-sequence). And for how email fits into the complete marketing system — from first visit to loyal customer — the [DRM 101 guide](/drm-101) covers the whole pipeline.

The best email in the world is worthless in the spam folder. Earn the inbox first.
