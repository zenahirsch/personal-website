---
path: "/blog/zendesk-ticket-history-v106-new-exclude-archived-tickets-option"
date: 2020-04-28T04:00:00.000+00:00
title: 'Zendesk Ticket History v1.0.6: "Exclude archived tickets" option'
summary: Yesterday, the latest version of my Zendesk app, Ticket History, was released.
slug: zendesk-ticket-history-v106-new-exclude-archived-tickets-option
published: true

---
I write a lot of [Zendesk](https://www.zendesk.com/) apps for work, most of which are only used internally at my company. One has been released for free (and [open-source](https://github.com/vimeo/zendesk-ticket-history/)) to the general public. It's a simple app called Ticket History, which shows a list of the requester's _other_ tickets when viewing a ticket. This allows agents to have a better understanding of how many times a customer has reached out, what topics they tend to write in about, and how their interactions with support have gone in the past (by showing the satisfaction rating alongside each ticket).

A while back, a product manager at Zendesk reached out and suggested that I modify the app so that archived tickets (closed tickets older than 120 days old) are excluded from this list—to improve performance. This seemed like a reasonable request, so I agreed and made the change. However, I didn't anticipate the backlash this would cause. As it turns out, many support agents really want to see _all_ of a requester's tickets, including those that are archived. Often, it was unclear to my users why certain tickets weren't showing up in the app; it just seemed broken.

Yesterday, the latest version of Ticket History (v1.0.6) was released. This version introduces a new configuration setting called _Exclude archived tickets_. It currently defaults to off, but that may change depending on the feedback I receive. Users can now control whether archived tickets are included or not, which allows them to choose a complete ticket history or improved performance. This seems like a choice that should be left to the individual user.

For users who have the app already installed, it should update to the latest version automatically. Remember that it defaults to excluding the archived tickets, so if you want to see them, you'll need to go into the app settings and uncheck the _Exclude archived tickets_ option. If you don't use Ticket History and would like to, it can be installed from the [Zendesk Marketplace](https://www.zendesk.com/apps/support/ticket-history/). As always, bugs and feedback can be reported by [opening a GitHub Issue](https://github.com/vimeo/zendesk-ticket-history/issues). I'm always looking for new ways to make the app more useful.

Happy supporting!