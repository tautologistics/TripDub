<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Feed Viewer 3</title>

    <link rel="stylesheet" type="text/css" href="resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="feed-viewer.css" />
	    
    <script type="text/javascript" src="adapter/ext/ext-base.js"></script>
 	<script type="text/javascript" src="ext-all-debug.js"></script>
    
    <script type="text/javascript" src="state/save-state.jss"></script>
    <script type="text/javascript" src="state/get-state.jss"></script>
    <script type="text/javascript" src="state/SessionProvider.js"></script>
    <script type="text/javascript" src="ux/TabCloseMenu.js"></script>
    <script type="text/javascript" src="FeedViewer.js"></script>
    <script type="text/javascript" src="FeedWindow.js"></script>
    <script type="text/javascript" src="FeedGrid.js"></script>
    <script type="text/javascript" src="MainPanel.js"></script>
    <script type="text/javascript" src="FeedPanel.js"></script>

</head>
<body>
<div id="header"><div style="float:right;margin:5px;" class="x-small-editor"></div></div>

<!-- Template used for Feed Items -->
<div id="preview-tpl" style="display:none;">
    <div class="post-data">
        <span class="post-date">{pubDate:date("M j, Y, g:i a")}</span>
        <h3 class="post-title">{title}</h3>
        <h4 class="post-author">by {author:defaultValue("Unknown")}</h4>
    </div>
    <div class="post-body">{content:this.getBody}</div>
</div>

</body>
</html>