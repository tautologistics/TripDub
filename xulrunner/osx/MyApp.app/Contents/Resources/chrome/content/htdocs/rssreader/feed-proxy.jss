<?js
// this is an example server-side proxy to load feeds
var feedUrl = (Request.Querystring.Get('feed') != '') ?
	Request.Querystring.Get('feed')
	:
	Request.Form.Get('feed');
//Response.Log(feedUrl);

if (feedUrl != '') {
	Response.ContentType = 'text/xml';
	if (feedUrl.toLowerCase().indexOf('http') == 0) {
		Response.Write(App.ReadNetFile(feedUrl)
			.replace('<content:encoded>', '<content>')
			.replace('</content:encoded>', '</content>')
			.replace('</dc:creator>', '</author>')
			.replace('<dc:creator', '<author'));
	} else if (feedUrl == 1) {
		//Response.Write('<?xml version="1.0" encoding="UTF-8"?' + '><?xml-stylesheet type="text/xsl" media="screen" href="/~d/styles/rss2full.xsl"?' + '><?xml-stylesheet type="text/css" media="screen" href="http://feeds2.feedburner.com/~d/styles/itemcontent.css"?' + '>');
		Response.Write('<?xml version="1.0" encoding="UTF-8"?' + '><?xml-stylesheet type="text/xsl" media="screen" href="/~d/styles/rss2full.xsl"? ' + '><?xml-stylesheet type="text/css" media="screen" href="http://feeds.feedburner.com/~d/styles/itemcontent.css"?' + '>');
?>
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0" version="2.0">
<channel>
	<title>NYC Resistor</title>
	
	<link>http://www.nycresistor.com</link>
	<description>We learn, share, and make things</description>
	<lastBuildDate>Tue, 25 Aug 2009 22:07:30 +0000</lastBuildDate>
	<generator>http://wordpress.org/?v=2.8.4</generator>
	<language>en</language>
	<sy:updatePeriod>hourly</sy:updatePeriod>
	<sy:updateFrequency>1</sy:updateFrequency>
			<atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="self" href="http://feeds.feedburner.com/NycResistor" type="application/rss+xml" /><feedburner:emailServiceId>NycResistor</feedburner:emailServiceId><feedburner:feedburnerHostname>http://feedburner.google.com</feedburner:feedburnerHostname><atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="hub" href="http://pubsubhubbub.appspot.com" /><item>
		<title>What browser does a socialist use?</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/0GG4AkBKbN8/</link>
		<comments>http://www.nycresistor.com/2009/08/25/what-browser-does-a-socialist-use/#comments</comments>
		<pubDate>Tue, 25 Aug 2009 22:07:30 +0000</pubDate>
		<dc:creator>Devon</dc:creator>
				<category><![CDATA[Awesome Awegust!!!]]></category>
		<category><![CDATA[Projects]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=2006</guid>
		<description><![CDATA[Apparently at least more then any other american political group, it&#8217;s Opera.
Earlier this month I decided to use Amazon Mechanical Turk to test a hypothesis in which I posited that IE as a browser would bias to the political right, and other browsers (specifically firefox) would bias to the political left.Ê A lot of other [...]]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F25%2Fwhat-browser-does-a-socialist-use%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F25%2Fwhat-browser-does-a-socialist-use%2F" height="61" width="51" /></a></div><p>Apparently at least more then any other american political group, it&#8217;s Opera.</p>
<p>Earlier this month I decided to use Amazon Mechanical Turk to test a hypothesis in which I posited that IE as a browser would bias to the political right, and other browsers (specifically firefox) would bias to the political left.Ê A lot of other interesting data surfaced including blockbuster performance of Firefox amongst Libertarians. Check out the whole <a href="http://www.evilsoft.org/?p=151">analysis</a> and grab the data!</p>
<p><img class="alignnone size-full wp-image-2007" title="browser_by_philosophy" src="http://www.nycresistor.com/wp-content/uploads/2009/08/browser_by_philosophy.png" alt="browser_by_philosophy" width="551" height="775" /></p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=0GG4AkBKbN8:9cdPQ_ysAWY:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=0GG4AkBKbN8:9cdPQ_ysAWY:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=0GG4AkBKbN8:9cdPQ_ysAWY:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/0GG4AkBKbN8" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/25/what-browser-does-a-socialist-use/feed/</wfw:commentRss>
		<slash:comments>0</slash:comments>
		<feedburner:origLink>http://www.nycresistor.com/2009/08/25/what-browser-does-a-socialist-use/</feedburner:origLink></item>
		<item>
		<title>The Interactive Party is this Saturday</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/oGqmsr9LcnU/</link>
		<comments>http://www.nycresistor.com/2009/08/22/the-interactive-party-is-this-saturday/#comments</comments>
		<pubDate>Sat, 22 Aug 2009 20:00:37 +0000</pubDate>
		<dc:creator>potatono</dc:creator>
				<category><![CDATA[Awesome Awegust!!!]]></category>
		<category><![CDATA[Games]]></category>
		<category><![CDATA[Music]]></category>
		<category><![CDATA[NYCResistor]]></category>
		<category><![CDATA[Party]]></category>
		<category><![CDATA[monome]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=1972</guid>
		<description><![CDATA[
PARTY TONIGHT!  BE THERE OR BE AN EQUILATERAL RHOMBUS! 
Here&#8217;s a flyer I whipped up for today&#8217;s party.  Looks like this one is going to be awesome. Can&#8217;t wait to play with all the cool projects.  There&#8217;s going to be a DJ this time too!  Make sure you&#8217;ve RSVPed!
]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F22%2Fthe-interactive-party-is-this-saturday%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F22%2Fthe-interactive-party-is-this-saturday%2F" height="61" width="51" /></a></div><p><a href="http://anyvite.com/imuwgd5wpe"><img src="http://farm4.static.flickr.com/3435/3830913166_fec1e17a09_d.jpg" width="480"></a></p>
<p>PARTY TONIGHT!  BE THERE OR BE AN EQUILATERAL RHOMBUS! </p>
<p>Here&#8217;s a <a href="http://www.flickr.com/photos/52076395@N00/3830913166/">flyer</a> I whipped up for today&#8217;s party.  Looks like this one is going to be awesome. Can&#8217;t wait to play with all the cool projects.  There&#8217;s going to be a DJ this time too!  <a href="http://anyvite.com/imuwgd5wpe">Make sure you&#8217;ve RSVPed!</a></p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=oGqmsr9LcnU:wX3hOp2ZtP4:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=oGqmsr9LcnU:wX3hOp2ZtP4:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=oGqmsr9LcnU:wX3hOp2ZtP4:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/oGqmsr9LcnU" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/22/the-interactive-party-is-this-saturday/feed/</wfw:commentRss>
		<slash:comments>0</slash:comments>
		<feedburner:origLink>http://www.nycresistor.com/2009/08/22/the-interactive-party-is-this-saturday/</feedburner:origLink></item>
		<item>
		<title>#AwesomeAugust: Arduino Fire Alarm v1.0 w/Flame Sensor</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/2y9TFfN6eEo/</link>
		<comments>http://www.nycresistor.com/2009/08/20/arduino-fire-alarm-v1-0/#comments</comments>
		<pubDate>Thu, 20 Aug 2009 04:40:41 +0000</pubDate>
		<dc:creator>wwward</dc:creator>
				<category><![CDATA[Arduino]]></category>
		<category><![CDATA[Awesome Awegust!!!]]></category>
		<category><![CDATA[Hardware]]></category>
		<category><![CDATA[NYCResistor]]></category>
		<category><![CDATA[Projects]]></category>
		<category><![CDATA[electronics]]></category>
		<category><![CDATA[#awesomeaugust]]></category>
		<category><![CDATA[fire]]></category>
		<category><![CDATA[sensing]]></category>
		<category><![CDATA[sensor]]></category>
		<category><![CDATA[uvtron]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=1991</guid>
		<description><![CDATA[When it comes to hacking, I tend to enjoy practical projects the most.Ê The Arduino is like physical computing &#8220;duct tape&#8221; that gives one the ability to &#8220;duct tape&#8221; things that need constant attention or action. If you need a plant watered, or your fish tank pump monitored, or your bikini-clad friends to set off [...]]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F20%2Farduino-fire-alarm-v1-0%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F20%2Farduino-fire-alarm-v1-0%2F" height="61" width="51" /></a></div><p>When it comes to hacking, I tend to enjoy practical projects the most.Ê The Arduino is like physical computing &#8220;duct tape&#8221; that gives one the ability to &#8220;duct tape&#8221; things that need constant attention or action. If you need a plant watered, or your fish tank pump monitored, or your <a title="Arduino Humanthesizer &amp; Bikini Models" href="http://www.nycresistor.com/2009/08/11/arduino-humanthesizer-bikini-models/" target="_blank">bikini-clad friends to set off a musical instrument with just their bodies</a> then the Arduino is <em>just</em> the tool you need. So what about fire?</p>
<div class="wp-caption aligncenter" style="width: 394px"><a href="http://wiki.nycresistor.com/images/a/aa/08182009024.jpg"><img title="Close-up of the UV TRON Sensor Tube" src="http://wiki.nycresistor.com/images/a/aa/08182009024.jpg" alt="UV TRON" width="384" height="512" /></a><p class="wp-caption-text">Close-up of the UV TRON Sensor Tube</p></div>
<p><span id="more-1991"></span>The Arduino Fire Alarm v1.0 is an attempt to solve for a reasonably probable flare up in our expensive Epilog laser cutter.Ê This pricey toy is a marvel of modern engineering, allowing Resistors and the community to craft remarkably precise objects from acrylic and wood, or etch complex designs onto various materials.Ê Smoke alarms are slow to react, but the <a title="Hamamatsu Photonics UV TRON" href="http://jp.hamamatsu.com/products/sensor-etd/pd006/R2868/index_en.html" target="_blank">UV TRON</a> sensor employed in the Arduino Fire Alarm reacts instantly to the UV light emitted by flames.Ê The tube responds to a very narrow band of the ultraviolet spectrum, keeping false alarms very low (really nonexistent in my experience.)Ê The rapid response time gives laser operators the ability to react quickly to a flare up and extinguish the fire before it damages the machinery.Ê Future designs may even incorporate clever extinguishing responses.</p>
<p>You can find out more about the Arduino Fire Alarm v1.0 on our <a title="NYC Resistor Wiki" href="http://wiki.nycresistor.com" target="_blank">Wiki</a> site <a title="Wiki: Arduino Fire Alarm v1.0" href="http://wiki.nycresistor.com/wiki/Arduino_Fire_Alarm_1.0" target="_blank">here</a> and download the Arduino sketch as well as a rudimentary parts list and schematic.Ê Build your own!Ê Parts will run you a bit over $100 if you don&#8217;t have a spare Arduino handy, but the device could be a lifesaver if you&#8217;re able to respond and extinguish a small flare up before it becomes a significant risk to your equipment or your facility.</p>
<p>This project had been sitting around on my to-do list for awhile, but with <a title="Awesome August" href="http://www.nycresistor.com/2009/08/04/nyc-resistors-awesome-august-challege/" target="_blank">AwesomeAugust</a> raging on, I felt it was time to give this project its due attention and usher it to completion.Ê W00t!</p>
<p><a title="Arduino Fire Alarm v1.0" href="http://wiki.nycresistor.com/wiki/Arduino_Fire_Alarm_1.0" target="_blank">Wiki Page: Arduino Fire Alarm v1.0</a></p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=2y9TFfN6eEo:pvMnv6YCfuM:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=2y9TFfN6eEo:pvMnv6YCfuM:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=2y9TFfN6eEo:pvMnv6YCfuM:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/2y9TFfN6eEo" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/20/arduino-fire-alarm-v1-0/feed/</wfw:commentRss>
		<slash:comments>0</slash:comments>
		<feedburner:origLink>http://www.nycresistor.com/2009/08/20/arduino-fire-alarm-v1-0/</feedburner:origLink></item>
		<item>
		<title>Last night at NYCRÉ</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/lU_wEK-dGE0/</link>
		<comments>http://www.nycresistor.com/2009/08/19/last-night-at-nycr/#comments</comments>
		<pubDate>Wed, 19 Aug 2009 16:39:02 +0000</pubDate>
		<dc:creator>potatono</dc:creator>
				<category><![CDATA[Awesome Awegust!!!]]></category>
		<category><![CDATA[NYCResistor]]></category>
		<category><![CDATA[Party]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=1985</guid>
		<description><![CDATA[
What&#8217;s going on here?  What does this have to do with the giant lite brite for the Interactive Party? I&#8217;ll give you three guesses.
]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F19%2Flast-night-at-nycr%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F19%2Flast-night-at-nycr%2F" height="61" width="51" /></a></div><p style="text-align:center"><a href="http://www.flickr.com/photos/52076395@N00/sets/72157621809328489/"><img src="http://farm3.static.flickr.com/2607/3836458901_06204cd775_o_d.jpg" height="480"></a></p>
<p>What&#8217;s going on here?  What does this have to do with the giant lite brite for the <a href="http://anyvite.com/imuwgd5wpe">Interactive Party</a>? I&#8217;ll give you three guesses.</p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=lU_wEK-dGE0:ftPuvSOabZY:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=lU_wEK-dGE0:ftPuvSOabZY:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=lU_wEK-dGE0:ftPuvSOabZY:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/lU_wEK-dGE0" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/19/last-night-at-nycr/feed/</wfw:commentRss>
		<slash:comments>2</slash:comments>
		<feedburner:origLink>http://www.nycresistor.com/2009/08/19/last-night-at-nycr/</feedburner:origLink></item>
		<item>
		<title>#AwesomeAugust Project: Fix and Learn the Monome</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/zu4wEaTsC_Y/</link>
		<comments>http://www.nycresistor.com/2009/08/19/awesomeaugust-project-fix-and-learn-the-monome/#comments</comments>
		<pubDate>Wed, 19 Aug 2009 04:35:35 +0000</pubDate>
		<dc:creator>Eric Skiff</dc:creator>
				<category><![CDATA[NYCResistor]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=1982</guid>
		<description><![CDATA[ 
A few months back, I acquired the Monome that Bre had put together. It&#8217;s a neat little device and I was able to hook it up using SerialPyIO to get it to light up, play some games, and communicate over OSC, but I was having trouble making any good sounding music with it, and [...]]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F19%2Fawesomeaugust-project-fix-and-learn-the-monome%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F19%2Fawesomeaugust-project-fix-and-learn-the-monome%2F" height="61" width="51" /></a></div><p><embed src="http://blip.tv/play/AYGY41wC" type="application/x-shockwave-flash" width="480" height="390" allowscriptaccess="always" allowfullscreen="true"></embed> </p>
<p>A few months back, I acquired the <a href="http://monome.org">Monome</a> that <a href="http://brepettis.com">Bre</a> had put together. It&#8217;s a neat little device and I was able to hook it up using SerialPyIO to get it to light up, play some games, and communicate over OSC, but I was having trouble making any good sounding music with it, and it was sitting on my shelf, unloved. It also needed an enclosure upgrade &#8211; I wanted to slim it down, make it a bit more sturdy, and let the circuits and the glow of the LEDs show through some sexy new clear acrylic.</p>
<p><a href="http://www.nycresistor.com/2009/08/04/nyc-resistors-awesome-august-challege/">AwesomeAugust</a> spurred me into action, and I grabbed a template for a enclosure top, cleaned it up a bit, added screw holes, designed slices for the hollow body, and started cutting it on the NYCR Laser. I just managed to make it all fit on one sheet of 12&#8243; x 24&#8243; acrylic. I&#8217;ve put the template online and it&#8217;s  and free for anyone to use/republish, however you like. Once it was sliced, I used acrylic cement to bond it all, snipped out the USB port, and it was good to go!</p>
<p><strong>Making music for free&#8230;</strong></p>
<p>While the laser was cutting away and the glue was drying on my new enclosure, I spent some time figuring out what tools to use to make music on the cheap. There&#8217;s lots of incredible, expensive software out there, but I&#8217;m really just playing around for now, and don&#8217;t have $500 to blow on a toy. While the full creative suites are often expensive, several companies make &#8220;runtime&#8221; versions that you can only use for playing instruments and patches other people have made. I decided on the free <a href="http://www.cycling74.com/downloads/max5">MaxMSP runtime</a>, and fired up <a href="http://www.edwardloveall.com/">Edward Loveall</a>&#8217;s &#8220;<a href="http://post.monome.org/comments.php?DiscussionID=5467">ArpShift</a>&#8221; script I found on the Monome forum to start programming sequences and changing their pitch and timing on the fly. It&#8217;s a great little script, but I wanted something a little more satisfying to listen to than the standard midi piano and other midi instruments it was playing, so I grabbed Native Instruments free <a href="http://www.native-instruments.com/#/en/products/producer/kontakt-player/">Kontakt player</a> samper and their free instrument sets. There are a lot more great scripts for MaxMSP and .nki instruments for Kontakt available on the web, so even without breaking the bank to roll your own instruments, you can make great sounding music on the fly. You can hear the simple tune I managed in just a few minutes with ArpShift and Kontakt in the video above. </p>
<p>I&#8217;m still looking for a good program to record the loops I&#8217;m creating with these instruments and assemble them into a song and I may break down and get myself a copy of <a href="http://www.ableton.com/">Ableton Live</a> LE for that. (Anyone know of other options for live loop creation and on the fly multitracking?)</p>
<p>In the meantime, I&#8217;ll be playing with my new music creation toy, and <a href="http://moonmilk.com">Ranjit</a> and I will be teaming up to hook the Monome up to his <a href="http://www.nycresistor.com/2009/08/11/toy-piano-rescue-project/">Player Toy Piano</a> for the <a href="http://anyvite.com/imuwgd5wpe">NYCR Interactive Party</a> this Saturday. If you want to play with the Monome/Player Toy Piano (or any of a bunch of other neat interactive projects in the works) <a href="http://anyvite.com/imuwgd5wpe">RSVP</a>, and we&#8217;ll see you there!</p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=zu4wEaTsC_Y:LBFDOCkwCmY:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=zu4wEaTsC_Y:LBFDOCkwCmY:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=zu4wEaTsC_Y:LBFDOCkwCmY:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/zu4wEaTsC_Y" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/19/awesomeaugust-project-fix-and-learn-the-monome/feed/</wfw:commentRss>
		<slash:comments>4</slash:comments>
		<feedburner:origLink>http://www.nycresistor.com/2009/08/19/awesomeaugust-project-fix-and-learn-the-monome/</feedburner:origLink></item>
		<item>
		<title>Hack your genome!</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/X4TgW7TaTDA/</link>
		<comments>http://www.nycresistor.com/2009/08/18/hack-your-genome/#comments</comments>
		<pubDate>Wed, 19 Aug 2009 00:00:26 +0000</pubDate>
		<dc:creator>chf2110</dc:creator>
				<category><![CDATA[NYCResistor]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=1977</guid>
		<description><![CDATA[As part of our on-going Awesome-August effort, I just completed my FPGA-based DNA sequence alignment accelerator! Behold!

This bad boy can reach 1.8 Giga-cell-updates-per-second when aligning two DNA sequences, all while running off of less than 2.5W from a USB port. Step 1 in my evil plan to take over the world is complete!
]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F18%2Fhack-your-genome%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F18%2Fhack-your-genome%2F" height="61" width="51" /></a></div><p style="text-align: left;">As part of our on-going Awesome-August effort, I just completed my <a href="http://chrisfenton.com/seqalign/">FPGA-based DNA sequence alignment accelerator</a>! Behold!<br />
<a href="http://www.nycresistor.com/wp-content/uploads/2009/08/NEXYS2_400.jpg"><img class="size-medium wp-image-1976 aligncenter" title="NEXYS2_400" src="http://www.nycresistor.com/wp-content/uploads/2009/08/NEXYS2_400-300x273.jpg" alt="NEXYS2_400" width="300" height="273" /></a></p>
<p style="text-align: left;">This bad boy can reach 1.8 Giga-cell-updates-per-second when aligning two DNA sequences, all while running off of less than 2.5W from a USB port. Step 1 in my evil plan to take over the world is complete!</p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=X4TgW7TaTDA:c5950bOl7l8:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=X4TgW7TaTDA:c5950bOl7l8:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=X4TgW7TaTDA:c5950bOl7l8:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/X4TgW7TaTDA" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/18/hack-your-genome/feed/</wfw:commentRss>
		<slash:comments>0</slash:comments>
		<feedburner:origLink>http://www.nycresistor.com/2009/08/18/hack-your-genome/</feedburner:origLink></item>
		<item>
		<title>Meeting Makers: Fritz of Fritz Glass</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/KYrVSpCr_EA/</link>
		<comments>http://www.nycresistor.com/2009/08/17/meeting-makers-fritz-of-fritz-glass/#comments</comments>
		<pubDate>Mon, 17 Aug 2009 05:49:44 +0000</pubDate>
		<dc:creator>Eric Skiff</dc:creator>
				<category><![CDATA[NYCResistor]]></category>
		<category><![CDATA[craft]]></category>
		<category><![CDATA[crafts]]></category>
		<category><![CDATA[Glass Blowing]]></category>
		<category><![CDATA[Maker]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=1969</guid>
		<description><![CDATA[While on vacation on Cape Cod, I got a chance to see Fritz of Fritz Glass, working his craft. Glass Blowing is a very technical art and he was a master craftsman, and was happy to share the process, answer questions, and talk while he worked. His open workshop felt a lot like Resistor, full [...]]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F17%2Fmeeting-makers-fritz-of-fritz-glass%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F17%2Fmeeting-makers-fritz-of-fritz-glass%2F" height="61" width="51" /></a></div><p>While on vacation on Cape Cod, I got a chance to see Fritz of <a href="http://www.fritzglass.com">Fritz Glass</a>, working his craft. Glass Blowing is a very technical art and he was a master craftsman, and was happy to share the process, answer questions, and talk while he worked. His open workshop felt a lot like Resistor, full of the tools of his trade and evidence of current hacking (he also builds his own furnaces!), and it was fascinating to watch the process, so I figured I&#8217;d share the video here. </p>
<p><embed src="http://blip.tv/play/AYGYjwAC" type="application/x-shockwave-flash" width="480" height="390" allowscriptaccess="always" allowfullscreen="true"></embed> </p>
<p><a href="http://blip.tv/file/get/Ericskiff-GlassBlowingDemoWithFritzGlass719.mov"><br />
High-Res quicktime file</a></p>
<p>Music: <a href="http://music.podshow.com/music/listeners/artistdetails.php?BandHash=11a303dee2dc743651f008952ecfccc6">Learn to Fly by Josh Woodward</a></p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=KYrVSpCr_EA:gYdrhmii0GI:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=KYrVSpCr_EA:gYdrhmii0GI:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=KYrVSpCr_EA:gYdrhmii0GI:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/KYrVSpCr_EA" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/17/meeting-makers-fritz-of-fritz-glass/feed/</wfw:commentRss>
		<slash:comments>0</slash:comments>
<enclosure url="http://blip.tv/file/get/Ericskiff-GlassBlowingDemoWithFritzGlass719.mov" length="67545750" type="video/quicktime" />
		<feedburner:origLink>http://www.nycresistor.com/2009/08/17/meeting-makers-fritz-of-fritz-glass/</feedburner:origLink></item>
		<item>
		<title>Glowy Shirt</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/NbXy7Z5gEAQ/</link>
		<comments>http://www.nycresistor.com/2009/08/15/glowy-shirt/#comments</comments>
		<pubDate>Sat, 15 Aug 2009 15:54:51 +0000</pubDate>
		<dc:creator>potatono</dc:creator>
				<category><![CDATA[Awesome Awegust!!!]]></category>
		<category><![CDATA[Party]]></category>
		<category><![CDATA[wearable]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=1966</guid>
		<description><![CDATA[
Took a break from the lite brite to make this pornj glowy shirt using coolneon wire.  One of many costumes I&#8217;ll need for burning man.  I&#8217;ll probably wear it at the party next week too. Make sure you RSVP!
]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F15%2Fglowy-shirt%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F15%2Fglowy-shirt%2F" height="61" width="51" /></a></div><p><a href="http://anyvite.com/imuwgd5wpe"><img src="http://farm3.static.flickr.com/2637/3823624432_4b3777fb1f_d.jpg" width="480"></a></p>
<p>Took a break from the lite brite to make this <a href="http://wiki.disorient.info/index.php?title=Pornj">pornj</a> glowy shirt using <a href="http://www.coolneon.com/">coolneon wire</a>.  One of many costumes I&#8217;ll need for burning man.  I&#8217;ll probably wear it at the party next week too. <a href="http://anyvite.com/imuwgd5wpe">Make sure you RSVP!</a></p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=NbXy7Z5gEAQ:WZw80XCAtFE:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=NbXy7Z5gEAQ:WZw80XCAtFE:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=NbXy7Z5gEAQ:WZw80XCAtFE:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/NbXy7Z5gEAQ" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/15/glowy-shirt/feed/</wfw:commentRss>
		<slash:comments>3</slash:comments>
		<feedburner:origLink>http://www.nycresistor.com/2009/08/15/glowy-shirt/</feedburner:origLink></item>
		<item>
		<title>toy piano rescue project</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/f7dNZddb85Y/</link>
		<comments>http://www.nycresistor.com/2009/08/11/toy-piano-rescue-project/#comments</comments>
		<pubDate>Wed, 12 Aug 2009 03:01:57 +0000</pubDate>
		<dc:creator>Ranjit</dc:creator>
				<category><![CDATA[Awesome Awegust!!!]]></category>
		<category><![CDATA[Music]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=1961</guid>
		<description><![CDATA[For Awesome August I&#8217;m trying to make something of this ebay toy piano that got smashed by UPS.
The music is Philip Glass&#8217;s &#34;Modern Love Waltz,&#34; inspired by toy-pianist Margaret Leng Tan

]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F11%2Ftoy-piano-rescue-project%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F11%2Ftoy-piano-rescue-project%2F" height="61" width="51" /></a></div><p>For <a href="http://www.nycresistor.com/2009/08/04/nyc-resistors-awesome-august-challege/">Awesome August</a> I&#8217;m trying to make something of this ebay toy piano that got smashed by UPS.</p>
<p>The music is Philip Glass&#8217;s &quot;Modern Love Waltz,&quot; inspired by toy-pianist Margaret Leng Tan</p>
<p><object type="application/x-shockwave-flash" width="500" height="375" data="http://www.flickr.com/apps/video/stewart.swf?v=71377" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="flashvars" value="intl_lang=en-us&#038;photo_secret=1f71a0bb91&#038;photo_id=3812924437"></param><param name="movie" value="http://www.flickr.com/apps/video/stewart.swf?v=71377"></param><param name="bgcolor" value="#000000"></param><param name="allowFullScreen" value="true"></param><embed type="application/x-shockwave-flash" src="http://www.flickr.com/apps/video/stewart.swf?v=71377" bgcolor="#000000" allowfullscreen="true" flashvars="intl_lang=en-us&#038;photo_secret=1f71a0bb91&#038;photo_id=3812924437" height="375" width="500"></embed></object></p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=f7dNZddb85Y:fzhAJubrHMs:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=f7dNZddb85Y:fzhAJubrHMs:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=f7dNZddb85Y:fzhAJubrHMs:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/f7dNZddb85Y" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/11/toy-piano-rescue-project/feed/</wfw:commentRss>
		<slash:comments>0</slash:comments>
		<feedburner:origLink>http://www.nycresistor.com/2009/08/11/toy-piano-rescue-project/</feedburner:origLink></item>
		<item>
		<title>Arduino Humanthesizer &amp; Bikini Models</title>
		<link>http://feedproxy.google.com/~r/NycResistor/~3/zv5SwfeoLus/</link>
		<comments>http://www.nycresistor.com/2009/08/11/arduino-humanthesizer-bikini-models/#comments</comments>
		<pubDate>Tue, 11 Aug 2009 22:37:19 +0000</pubDate>
		<dc:creator>Nick Bilton</dc:creator>
				<category><![CDATA[NYCResistor]]></category>

		<guid isPermaLink="false">http://www.nycresistor.com/?p=1957</guid>
		<description><![CDATA[
From Engadget
]]></description>
			<content:encoded><![CDATA[<div class="tweetmeme_button" style="float: right; margin-left: 10px;margin-top:-23px;margin-right:-25px;padding-right:0px"><a href="http://api.tweetmeme.com/share?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F11%2Farduino-humanthesizer-bikini-models%2F"><img src="http://api.tweetmeme.com/imagebutton.gif?url=http%3A%2F%2Fwww.nycresistor.com%2F2009%2F08%2F11%2Farduino-humanthesizer-bikini-models%2F" height="61" width="51" /></a></div><p><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="500" height="300" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/up1wraRnriI&amp;hl=en&amp;fs=1&amp;color1=0x006699&amp;color2=0x54abd6" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="500" height="300" src="http://www.youtube.com/v/up1wraRnriI&amp;hl=en&amp;fs=1&amp;color1=0x006699&amp;color2=0x54abd6" allowscriptaccess="always" allowfullscreen="true"></embed></object></p>
<p>From <a href="http://www.engadget.com/2009/08/11/humanthesizer-turns-15-bikini-models-into-a-live-dancing-synth/">Engadget</a></p>
<div class="feedflare">
<a href="http://feeds.feedburner.com/~ff/NycResistor?a=zv5SwfeoLus:z2BD00i4jhI:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/NycResistor?d=yIl2AUoC8zA" border="0"></img></a> <a href="http://feeds.feedburner.com/~ff/NycResistor?a=zv5SwfeoLus:z2BD00i4jhI:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/NycResistor?i=zv5SwfeoLus:z2BD00i4jhI:V_sGLiPBpWU" border="0"></img></a>
</div><img src="http://feeds.feedburner.com/~r/NycResistor/~4/zv5SwfeoLus" height="1" width="1"/>]]></content:encoded>
			<wfw:commentRss>http://www.nycresistor.com/2009/08/11/arduino-humanthesizer-bikini-models/feed/</wfw:commentRss>
		<slash:comments>2</slash:comments>
		<feedburner:origLink>http://www.nycresistor.com/2009/08/11/arduino-humanthesizer-bikini-models/</feedburner:origLink></item>
	</channel>
</rss>
<?js
	}
}
?>