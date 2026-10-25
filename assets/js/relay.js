/* Six-guide relay: picks the voice and the handover line for each narration segment.
   Pure logic (no DOM) so it can be tested with node. Data: window.TRIP_RELAY (data/relay.js).
   Rules: each segment lists 3 stock voices; the player picks one at random, never the previous voice.
   Before each segment the new guide says a short handover line: an intro at the very start,
   otherwise the tease about the previous guide (fresh pairs first; a pair may come back only
   after it has not been heard for a while), else one of the guide's fallback lines. */
(function (root) {
  "use strict";
  var RECENT = 12;
  function Relay(data, saved, rng) {
    this.d = data;
    this.rng = rng || Math.random;
    var s = saved || {};
    this.prev = s.prev || null;
    this.used = s.used || {};       /* "speaker<prev" -> true once the tease was heard */
    this.recent = s.recent || [];   /* last handover keys, newest last */
  }
  Relay.prototype.state = function () { return { prev: this.prev, used: this.used, recent: this.recent }; };
  Relay.prototype.reset = function () { this.prev = null; this.used = {}; this.recent = []; };
  Relay.prototype.pick = function (a) { return a[Math.floor(this.rng() * a.length) % a.length]; };
  Relay.prototype.isRecent = function (k) { return this.recent.indexOf(k) !== -1; };
  /* Plan one segment: returns { seg, voice, prev, hand: {kind, key, text, src}, src, text } and advances the state. */
  Relay.prototype.next = function (seg) {
    var self = this, d = this.d, prev = this.prev;
    var cands = seg.v.filter(function (v) { return v !== prev; });
    if (!cands.length) cands = seg.v.slice();
    var voice;
    if (prev) {
      var fresh = cands.filter(function (v) { return !self.used[v + "<" + prev]; });
      var notRecent = cands.filter(function (v) { return !self.isRecent("tease_" + v + "_" + prev); });
      voice = this.pick(fresh.length ? fresh : notRecent.length ? notRecent : cands);
    } else voice = this.pick(cands);
    var hand;
    if (!prev) hand = { kind: "intro", key: "intro_" + voice, text: d.hand.intro[voice] };
    else {
      var tk = "tease_" + voice + "_" + prev;
      if (!this.used[voice + "<" + prev] || !this.isRecent(tk)) {
        hand = { kind: "tease", key: tk, text: d.hand.tease[voice][prev] };
        this.used[voice + "<" + prev] = true;
      } else {
        var fb = d.hand.fallback[voice].map(function (t, i) { return { kind: "fallback", key: "fallback_" + voice + "_" + (i + 1), text: t }; });
        var ok = fb.filter(function (h) { return !self.isRecent(h.key); });
        if (ok.length) hand = this.pick(ok);
        else hand = fb.slice().sort(function (a, b) { return self.recent.indexOf(a.key) - self.recent.indexOf(b.key); })[0];
      }
    }
    hand.src = d.base + "h/" + hand.key + ".mp3";
    this.recent.push(hand.key);
    if (this.recent.length > RECENT) this.recent.shift();
    this.prev = voice;
    return { seg: seg, voice: voice, prev: prev, hand: hand, src: d.base + "s/" + seg.id + "_" + voice + ".mp3", text: seg.text };
  };
  /* Every file a tour can play (for the offline-save button). */
  function files(data, tourId) {
    var t = data.tours[tourId], out = [], b = data.base;
    if (!t) return out;
    var segs = [].concat(t.start || [], t.end || []);
    Object.keys(t.stops).forEach(function (k) { segs = segs.concat(t.stops[k]); });
    segs.forEach(function (s) { s.v.forEach(function (v) { out.push(b + "s/" + s.id + "_" + v + ".mp3"); }); });
    Object.keys(data.voices).forEach(function (v) {
      out.push(b + "h/intro_" + v + ".mp3");
      Object.keys(data.hand.tease[v]).forEach(function (p) { out.push(b + "h/tease_" + v + "_" + p + ".mp3"); });
      data.hand.fallback[v].forEach(function (_, i) { out.push(b + "h/fallback_" + v + "_" + (i + 1) + ".mp3"); });
    });
    return out;
  }
  var api = { Relay: Relay, files: files };
  root.TripRelay = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : this);
