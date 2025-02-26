"use strict";

var XHR = XMLHttpRequest,
	img_re = /\.(a?png|avif|bmp|gif|heif|jpe?g|jfif|svg|webp|webm|mkv|mp4)(\?|$)/i;

var Ls = {
	"eng": {
		"tt": "English",

		"cols": {
			"c": "action buttons",
			"dur": "duration",
			"q": "quality / bitrate",
			"Ac": "audio codec",
			"Vc": "video codec",
			"Fmt": "format / container",
			"Ahash": "audio checksum",
			"Vhash": "video checksum",
			"Res": "resolution",
			"T": "filetype",
			"aq": "audio quality / bitrate",
			"vq": "video quality / bitrate",
			"pixfmt": "subsampling / pixel structure",
			"resw": "horizontal resolution",
			"resh": "veritcal resolution",
			"chs": "audio channels",
			"hz": "sample rate"
		},

		"hks": [
			[
				"misc",
				["ESC", "close various things"],

				"file-manager",
				["G", "toggle list / grid view"],
				["T", "toggle thumbnails / icons"],
				["🡅 A/D", "thumbnail size"],
				["ctrl-K", "delete selected"],
				["ctrl-X", "cut selected"],
				["ctrl-V", "paste into folder"],
				["Y", "download selected"],
				["F2", "rename selected"],

				"file-list-sel",
				["space", "toggle file selection"],
				["🡑/🡓", "move selection cursor"],
				["ctrl 🡑/🡓", "move cursor and viewport"],
				["🡅 🡑/🡓", "select prev/next file"],
				["ctrl-A", "select all files / folders"],
			], [
				"navigation",
				["B", "toggle breadcrumbs / navpane"],
				["I/K", "prev/next folder"],
				["M", "parent folder (or unexpand current)"],
				["V", "toggle folders / textfiles in navpane"],
				["A/D", "navpane size"],
			], [
				"audio-player",
				["J/L", "prev/next song"],
				["U/O", "skip 10sec back/fwd"],
				["0..9", "jump to 0%..90%"],
				["P", "play/pause (also initiates)"],
				["Y", "download song"],
			], [
				"image-viewer",
				["J/L, ←/→", "prev/next pic"],
				["Home/End", "first/last pic"],
				["F", "fullscreen"],
				["R", "rotate clockwise"],
				["🡅 R", "rotate ccw"],
				["Y", "download pic"],
			], [
				"video-player",
				["U/O", "skip 10sec back/fwd"],
				["P/K/Space", "play/pause"],
				["C", "continue playing next"],
				["V", "loop"],
				["M", "mute"],
				["[ and ]", "set loop interval"],
			], [
				"textfile-viewer",
				["I/K", "prev/next file"],
				["M", "close textfile"],
				["E", "edit textfile"],
				["S", "select file (for cut/rename)"],
			]
		],

		"m_ok": "OK",
		"m_ng": "Cancel",

		"enable": "Enable",
		"danger": "DANGER",
		"clipped": "copied to clipboard",

		"ht_s": "second!s",
		"ht_m": "minute!s",
		"ht_h": "hour!s",
		"ht_d": "day!s",
		"ht_and": " and ",

		"goh": "control-panel",
		"gop": 'previous sibling">prev',
		"gou": 'parent folder">up',
		"gon": 'next folder">next',
		"logout": "Logout ",
		"access": " access",
		"ot_close": "close submenu",
		"ot_search": "search for files by attributes, path / name, music tags, or any combination of those$N$N&lt;code&gt;foo bar&lt;/code&gt; = must contain both «foo» and «bar»,$N&lt;code&gt;foo -bar&lt;/code&gt; = must contain «foo» but not «bar»,$N&lt;code&gt;^yana .opus$&lt;/code&gt; = start with «yana» and be an «opus» file$N&lt;code&gt;&quot;try unite&quot;&lt;/code&gt; = contain exactly «try unite»$N$Nthe date format is iso-8601, like$N&lt;code&gt;2009-12-31&lt;/code&gt; or &lt;code&gt;2020-09-12 23:30:00&lt;/code&gt;",
		"ot_unpost": "unpost: delete your recent uploads, or abort unfinished ones",
		"ot_bup": "bup: basic uploader, even supports netscape 4.0",
		"ot_mkdir": "mkdir: create a new directory",
		"ot_md": "new-md: create a new markdown document",
		"ot_msg": "msg: send a message to the server log",
		"ot_mp": "media player options",
		"ot_cfg": "configuration options",
		"ot_u2i": 'up2k: upload files (if you have write-access) or toggle into the search-mode to see if they exist somewhere on the server$N$Nuploads are resumable, multithreaded, and file timestamps are preserved, but it uses more CPU than [🎈]&nbsp; (the basic uploader)<br /><br />during uploads, this icon becomes a progress indicator!',
		"ot_u2w": 'up2k: upload files with resume support (close your browser and drop the same files in later)$N$Nmultithreaded, and file timestamps are preserved, but it uses more CPU than [🎈]&nbsp; (the basic uploader)<br /><br />during uploads, this icon becomes a progress indicator!',
		"ot_noie": 'Please use Chrome / Firefox / Edge',

		"ab_mkdir": "make directory",
		"ab_mkdoc": "new markdown doc",
		"ab_msg": "send msg to srv log",

		"ay_path": "skip to folders",
		"ay_files": "skip to files",

		"wt_ren": "rename selected items$NHotkey: F2",
		"wt_del": "delete selected items$NHotkey: ctrl-K",
		"wt_cut": "cut selected items &lt;small&gt;(then paste somewhere else)&lt;/small&gt;$NHotkey: ctrl-X",
		"wt_pst": "paste a previously cut / copied selection$NHotkey: ctrl-V",
		"wt_selall": "select all files$NHotkey: ctrl-A (when file focused)",
		"wt_selinv": "invert selection",
		"wt_selzip": "download selection as archive",
		"wt_seldl": "download selection as separate files$NHotkey: Y",
		"wt_npirc": "copy irc-formatted track info",
		"wt_nptxt": "copy plaintext track info",
		"wt_grid": "toggle grid / list view$NHotkey: G",
		"wt_prev": "previous track$NHotkey: J",
		"wt_play": "play / pause$NHotkey: P",
		"wt_next": "next track$NHotkey: L",

		"ul_par": "parallel uploads:",
		"ut_rand": "randomize filenames",
		"ut_u2ts": "copy the last-modified timestamp$Nfrom your filesystem to the server",
		"ut_mt": "continue hashing other files while uploading$N$Nmaybe disable if your CPU or HDD is a bottleneck",
		"ut_ask": 'ask for confirmation before upload starts">💭',
		"ut_pot": "improve upload speed on slow devices$Nby making the UI less complex",
		"ut_srch": "don't actually upload, instead check if the files already $N exist on the server (will scan all folders you can read)",
		"ut_par": "pause uploads by setting it to 0$N$Nincrease if your connection is slow / high latency$N$Nkeep it 1 on LAN or if the server HDD is a bottleneck",
		"ul_btn": "drop files / folders<br>here (or click me)",
		"ul_btnu": "U P L O A D",
		"ul_btns": "S E A R C H",

		"ul_hash": "hash",
		"ul_send": "send",
		"ul_done": "done",
		"ul_idle1": "no uploads are queued yet",
		"ut_etah": "average &lt;em&gt;hashing&lt;/em&gt; speed, and estimated time until finish",
		"ut_etau": "average &lt;em&gt;upload&lt;/em&gt; speed and estimated time until finish",
		"ut_etat": "average &lt;em&gt;total&lt;/em&gt; speed and estimated time until finish",

		"uct_ok": "completed successfully",
		"uct_ng": "no-good: failed / rejected / not-found",
		"uct_done": "ok and ng combined",
		"uct_bz": "hashing or uploading",
		"uct_q": "idle, pending",

		"utl_name": "filename",
		"utl_ulist": "list",
		"utl_ucopy": "copy",
		"utl_links": "links",
		"utl_stat": "status",
		"utl_prog": "progress",

		// keep short:
		"utl_404": "404",
		"utl_err": "ERROR",
		"utl_oserr": "OS-error",
		"utl_found": "found",
		"utl_defer": "defer",
		"utl_yolo": "YOLO",
		"utl_done": "done",

		"ul_flagblk": "the files were added to the queue</b><br>however there is a busy up2k in another browser tab,<br>so waiting for that to finish first",
		"ul_btnlk": "the server configuration has locked this switch into this state",

		"udt_up": "Upload",
		"udt_srch": "Search",
		"udt_drop": "drop it here",

		"u_nav_m": '<h6>aight, what do you have?</h6><code>Enter</code> = Files (one or more)\n<code>ESC</code> = One folder (including subfolders)',
		"u_nav_b": '<a href="#" id="modal-ok">Files</a><a href="#" id="modal-ng">One folder</a>',

		"cl_opts": "switches",
		"cl_themes": "theme",
		"cl_langs": "language",
		"cl_ziptype": "folder download",
		"cl_uopts": "up2k switches",
		"cl_favico": "favicon",
		"cl_bigdir": "big dirs",
		"cl_keytype": "key notation",
		"cl_hiddenc": "hidden columns",
		"cl_hidec": "hide",
		"cl_reset": "reset",
		"cl_hpick": "tap on column headers to hide in the table below",
		"cl_hcancel": "column hiding aborted",

		"ct_grid": '田 the grid',
		"ct_ttips": '◔ ◡ ◔">ℹ️ tooltips',
		"ct_thumb": 'in grid-view, toggle icons or thumbnails$NHotkey: T">🖼️ thumbs',
		"ct_csel": 'use CTRL and SHIFT for file selection in grid-view">sel',
		"ct_ihop": 'when the image viewer is closed, scroll down to the last viewed file">g⮯',
		"ct_dots": 'show hidden files (if server permits)">dotfiles',
		"ct_dir1st": 'sort folders before files">📁 first',
		"ct_readme": 'show README.md in folder listings">📜 readme',
		"ct_idxh": 'show index.html instead of folder listing">htm',
		"ct_sbars": 'show scrollbars">⟊',

		"cut_umod": "if a file already exists on the server, update the server's last-modified timestamp to match your local file (requires write+delete permissions)\">re📅",

		"cut_turbo": "the yolo button, you probably DO NOT want to enable this:$N$Nuse this if you were uploading a huge amount of files and had to restart for some reason, and want to continue the upload ASAP$N$Nthis replaces the hash-check with a simple <em>&quot;does this have the same filesize on the server?&quot;</em> so if the file contents are different it will NOT be uploaded$N$Nyou should turn this off when the upload is done, and then &quot;upload&quot; the same files again to let the client verify them\">turbo",

		"cut_datechk": "has no effect unless the turbo button is enabled$N$Nreduces the yolo factor by a tiny amount; checks whether the file timestamps on the server matches yours$N$Nshould <em>theoretically</em> catch most unfinished / corrupted uploads, but is not a substitute for doing a verification pass with turbo disabled afterwards\">date-chk",

		"cut_u2sz": "size (in MiB) of each upload chunk; big values fly better across the atlantic. Try low values on very unreliable connections",

		"cut_flag": "ensure only one tab is uploading at a time $N -- other tabs must have this enabled too $N -- only affects tabs on the same domain",

		"cut_az": "upload files in alphabetical order, rather than smallest-file-first$N$Nalphabetical order can make it easier to eyeball if something went wrong on the server, but it makes uploading slightly slower on fiber / LAN",

		"cut_nag": "OS notification when upload completes$N(only if the browser or tab is not active)",
		"cut_sfx": "audible alert when upload completes$N(only if the browser or tab is not active)",

		"cut_mt": "use multithreading to accelerate file hashing$N$Nthis uses web-workers and requires$Nmore RAM (up to 512 MiB extra)$N$N30% faster https, 4.5x faster http,$Nand 5.3x faster on android phones\">mt",

		"cft_text": "favicon text (blank and refresh to disable)",
		"cft_fg": "foreground color",
		"cft_bg": "background color",

		"cdt_lim": "max number of files to show in a folder",
		"cdt_ask": "when scrolling to the bottom,$Ninstead of loading more files,$Nask what to do",

		"tt_entree": "show navpane (directory tree sidebar)$NHotkey: B",
		"tt_detree": "show breadcrumbs$NHotkey: B",
		"tt_visdir": "scroll to selected folder",
		"tt_ftree": "toggle folder-tree / textfiles$NHotkey: V",
		"tt_pdock": "show parent folders in a docked pane at the top",
		"tt_dynt": "autogrow as tree expands",
		"tt_wrap": "word wrap",
		"tt_hover": "reveal overflowing lines on hover$N( breaks scrolling unless mouse $N&nbsp; cursor is in the left gutter )",

		"ml_pmode": "at end of folder...",
		"ml_btns": "cmds",
		"ml_tcode": "transcode",
		"ml_tint": "tint",
		"ml_eq": "audio equalizer",
		"ml_drc": "dynamic range compressor",

		"mt_shuf": "shuffle the songs in each folder\">🔀",
		"mt_aplay": "autoplay if there is a song-ID in the link you clicked to access the server$N$Ndisabling this will also stop the page URL from being updated with song-IDs when playing music, to prevent autoplay if these settings are lost but the URL remains\">a▶",
		"mt_preload": "start loading the next song near the end for gapless playback\">preload",
		"mt_prescan": "go to the next folder before the last song$Nends, keeping the webbrowser happy$Nso it doesn't stop the playback\">nav",
		"mt_fullpre": "try to preload the entire song;$N✅ enable on <b>unreliable</b> connections,$N❌ <b>disable</b> on slow connections probably\">full",
		"mt_fau": "on phones, prevent music from stopping if the next song doesn't preload fast enough (can make tags display glitchy)\">☕️",
		"mt_waves": "waveform seekbar:$Nshow audio amplitude in the scrubber\">~s",
		"mt_npclip": "show buttons for clipboarding the currently playing song\">/np",
		"mt_octl": "os integration (media hotkeys / osd)\">os-ctl",
		"mt_oseek": "allow seeking through os integration$N$Nnote: on some devices (iPhones),$Nthis replaces the next-song button\">seek",
		"mt_oscv": "show album cover in osd\">art",
		"mt_follow": "keep the playing track scrolled into view\">🎯",
		"mt_compact": "compact controls\">⟎",
		"mt_uncache": "clear cache &nbsp;(try this if your browser cached$Na broken copy of a song so it refuses to play)\">uncache",
		"mt_mloop": "loop the open folder\">🔁 loop",
		"mt_mnext": "load the next folder and continue\">📂 next",
		"mt_cflac": "convert flac / wav to opus\">flac",
		"mt_caac": "convert aac / m4a to opus\">aac",
		"mt_coth": "convert all others (not mp3) to opus\">oth",
		"mt_tint": "background level (0-100) on the seekbar$Nto make buffering less distracting",
		"mt_eq": "enables the equalizer and gain control;$N$Nboost &lt;code&gt;0&lt;/code&gt; = standard 100% volume (unmodified)$N$Nwidth &lt;code&gt;1 &nbsp;&lt;/code&gt; = standard stereo (unmodified)$Nwidth &lt;code&gt;0.5&lt;/code&gt; = 50% left-right crossfeed$Nwidth &lt;code&gt;0 &nbsp;&lt;/code&gt; = mono$N$Nboost &lt;code&gt;-0.8&lt;/code&gt; &amp; width &lt;code&gt;10&lt;/code&gt; = vocal removal :^)$N$Nenabling the equalizer makes gapless albums fully gapless, so leave it on with all the values at zero (except width = 1) if you care about that",
		"mt_drc": "enables the dynamic range compressor (volume flattener / brickwaller); will also enable EQ to balance the spaghetti, so set all EQ fields except for 'width' to 0 if you don't want it$N$Nlowers the volume of audio above THRESHOLD dB; for every RATIO dB past THRESHOLD there is 1 dB of output, so default values of tresh -24 and ratio 12 means it should never get louder than -22 dB and it is safe to increase the equalizer boost to 0.8, or even 1.8 with ATK 0 and a huge RLS like 90 (only works in firefox; RLS is max 1 in other browsers)$N$N(see wikipedia, they explain it much better)",

		"mb_play": "play",
		"mm_hashplay": "play this audio file?",
		"mp_breq": "need firefox 82+ or chrome 73+ or iOS 15+",
		"mm_bload": "now loading...",
		"mm_bconv": "converting to {0}, please wait...",
		"mm_opusen": "your browser cannot play aac / m4a files;\ntranscoding to opus is now enabled",
		"mm_playerr": "playback failed: ",
		"mm_eabrt": "The playback attempt was cancelled",
		"mm_enet": "Your internet connection is wonky",
		"mm_edec": "This file is supposedly corrupted??",
		"mm_esupp": "Your browser does not understand this audio format",
		"mm_eunk": "Unknown Errol",
		"mm_e404": "Could not play audio; error 404: File not found.",
		"mm_e403": "Could not play audio; error 403: Access denied.\n\nTry pressing F5 to reload, maybe you got logged out",
		"mm_e5xx": "Could not play audio; server error ",
		"mm_nof": "not finding any more audio files nearby",
		"mm_prescan": "Looking for music to play next...",
		"mm_scank": "Found the next song:",
		"mm_uncache": "cache cleared; all songs will redownload on next playback",
		"mm_hnf": "that song no longer exists",

		"im_hnf": "that image no longer exists",

		"f_empty": 'this folder is empty',
		"f_chide": 'this will hide the column «{0}»\n\nyou can unhide columns in the settings tab',
		"f_bigtxt": "this file is {0} MiB large -- really view as text?",
		"fbd_more": '<div id="blazy">showing <code>{0}</code> of <code>{1}</code> files; <a href="#" id="bd_more">show {2}</a> or <a href="#" id="bd_all">show all</a></div>',
		"fbd_all": '<div id="blazy">showing <code>{0}</code> of <code>{1}</code> files; <a href="#" id="bd_all">show all</a></div>',

		"f_dls": 'the file links in the current folder have\nbeen changed into download links',

		"f_partial": "To safely download a file which is currently being uploaded, please click the file which has the same filename, but without the <code>.PARTIAL</code> file extension. Please press CANCEL or Escape to do this.\n\nPressing OK / Enter will ignore this warning and continue downloading the <code>.PARTIAL</code> scratchfile instead, which will almost definitely give you corrupted data.",

		"ft_paste": "paste {0} items$NHotkey: ctrl-V",
		"fr_eperm": 'cannot rename:\nyou do not have “move” permission in this folder',
		"fd_eperm": 'cannot delete:\nyou do not have “delete” permission in this folder',
		"fc_eperm": 'cannot cut:\nyou do not have “move” permission in this folder',
		"fp_eperm": 'cannot paste:\nyou do not have “write” permission in this folder',
		"fr_emore": "select at least one item to rename",
		"fd_emore": "select at least one item to delete",
		"fc_emore": "select at least one item to cut",

		"fs_sc": "share the folder you're in",
		"fs_ss": "share the selected files",
		"fs_just1d": "you cannot select more than one folder,\nor mix flies and folders in one selection",
		"fs_abrt": "❌ abort",
		"fs_rand": "🎲 rand.name",
		"fs_go": "✅ create share",
		"fs_name": "name",
		"fs_src": "source",
		"fs_pwd": "passwd",
		"fs_exp": "expiry",
		"fs_tmin": "min",
		"fs_thrs": "hours",
		"fs_tdays": "days",
		"fs_never": "eternal",
		"fs_pname": "optional link name; will be random if blank",
		"fs_tsrc": "the file or folder to share",
		"fs_ppwd": "optional password",
		"fs_w8": "creating share...",
		"fs_ok": "<h6>share-URL created</h6>\npress <code>Enter/OK</code> to Clipboard\npress <code>ESC/Cancel</code> to Close\n\n",

		"frt_dec": "may fix some cases of broken filenames\">url-decode",
		"frt_rst": "reset modified filenames back to the original ones\">↺ reset",
		"frt_abrt": "abort and close this window\">❌ cancel",
		"frb_apply": "APPLY RENAME",
		"fr_adv": "batch / metadata / pattern renaming\">advanced",
		"fr_case": "case-sensitive regex\">case",
		"fr_win": "windows-safe names; replace <code>&lt;&gt;:&quot;\\|?*</code> with japanese fullwidth characters\">win",
		"fr_slash": "replace <code>/</code> with a character that doesn't cause new folders to be created\">no /",
		"fr_re": "regex search pattern to apply to original filenames; capturing groups can be referenced in the format field below like &lt;code&gt;(1)&lt;/code&gt; and &lt;code&gt;(2)&lt;/code&gt; and so on",
		"fr_fmt": "inspired by foobar2000:$N&lt;code&gt;(title)&lt;/code&gt; is replaced by song title,$N&lt;code&gt;[(artist) - ](title)&lt;/code&gt; skips [this] part if artist is blank$N&lt;code&gt;$lpad((tn),2,0)&lt;/code&gt; pads tracknumber to 2 digits",
		"fr_pdel": "delete",
		"fr_pnew": "save as",
		"fr_pname": "provide a name for your new preset",
		"fr_aborted": "aborted",
		"fr_lold": "old name",
		"fr_lnew": "new name",
		"fr_tags": "tags for the selected files (read-only, just for reference):",
		"fr_busy": "renaming {0} items...\n\n{1}",
		"fr_efail": "rename failed:\n",
		"fr_nchg": "{0} of the new names were altered due to <code>win</code> and/or <code>no /</code>\n\nOK to continue with these altered new names?",

		"fd_ok": "delete OK",
		"fd_err": "delete failed:\n",
		"fd_none": "nothing was deleted; maybe blocked by server config (xbd)?",
		"fd_busy": "deleting {0} items...\n\n{1}",
		"fd_warn1": "DELETE these {0} items?",
		"fd_warn2": "<b>Last chance!</b> No way to undo. Delete?",

		"fc_ok": "cut {0} items",
		"fc_warn": 'cut {0} items\n\nbut: only <b>this</b> browser-tab can paste them\n(since the selection is so absolutely massive)',

		"fp_ecut": "first cut some files / folders to paste / move\n\nnote: you can cut / paste across different browser tabs",
		"fp_ename": "these {0} items cannot be moved here (names already exist):",
		"fp_ok": "move OK",
		"fp_busy": "moving {0} items...\n\n{1}",
		"fp_err": "move failed:\n",
		"fp_confirm": "move these {0} items here?",
		"fp_etab": 'failed to read clipboard from other browser tab',
		"fp_name": "uploading a file from your device. Give it a name:",
		"fp_both_m": '<h6>choose what to paste</h6><code>Enter</code> = Move {0} files from «{1}»\n<code>ESC</code> = Upload {2} files from your device',
		"fp_both_b": '<a href="#" id="modal-ok">Move</a><a href="#" id="modal-ng">Upload</a>',

		"mk_noname": "type a name into the text field on the left before you do that :p",

		"tv_load": "Loading text document:\n\n{0}\n\n{1}% ({2} of {3} MiB loaded)",
		"tv_xe1": "could not load textfile:\n\nerror ",
		"tv_xe2": "404, file not found",
		"tv_lst": "list of textfiles in",
		"tvt_close": "return to folder view$NHotkey: M (or Esc)\">❌ close",
		"tvt_dl": "download this file$NHotkey: Y\">💾 download",
		"tvt_prev": "show previous document$NHotkey: i\">⬆ prev",
		"tvt_next": "show next document$NHotkey: K\">⬇ next",
		"tvt_sel": "select file &nbsp; ( for cut / delete / ... )$NHotkey: S\">sel",
		"tvt_edit": "open file in text editor$NHotkey: E\">✏️ edit",

		"gt_vau": "don't show videos, just play the audio\">🎧",
		"gt_msel": "enable file selection; ctrl-click a file to override$N$N&lt;em&gt;when active: doubleclick a file / folder to open it&lt;/em&gt;$N$NHotkey: S\">multiselect",
		"gt_crop": "center-crop thumbnails\">crop",
		"gt_3x": "hi-res thumbnails\">3x",
		"gt_zoom": "zoom",
		"gt_chop": "chop",
		"gt_sort": "sort by",
		"gt_name": "name",
		"gt_sz": "size",
		"gt_ts": "date",
		"gt_ext": "type",
		"gt_c1": "truncate filenames more (show less)",
		"gt_c2": "truncate filenames less (show more)",

		"sm_w8": "searching...",
		"sm_prev": "search results below are from a previous query:\n  ",
		"sl_close": "close search results",
		"sl_hits": "showing {0} hits",
		"sl_moar": "load more",

		"s_sz": "size",
		"s_dt": "date",
		"s_rd": "path",
		"s_fn": "name",
		"s_ta": "tags",
		"s_ua": "up@",
		"s_ad": "adv.",
		"s_s1": "minimum MiB",
		"s_s2": "maximum MiB",
		"s_d1": "min. iso8601",
		"s_d2": "max. iso8601",
		"s_u1": "uploaded after",
		"s_u2": "and/or before",
		"s_r1": "path contains &nbsp; (space-separated)",
		"s_f1": "name contains &nbsp; (negate with -nope)",
		"s_t1": "tags contains &nbsp; (^=start, end=$)",
		"s_a1": "specific metadata properties",

		"md_eshow": "cannot render ",
		"md_off": "[📜<em>readme</em>] disabled in [⚙️] -- document hidden",

		"badreply": "Failed to parse reply from server",

		"xhr403": "403: Access denied\n\ntry pressing F5, maybe you got logged out",
		"xhr0": "unknown (probably lost connection to server, or server is offline)",
		"cf_ok": "sorry about that -- DD" + wah + "oS protection kicked in\n\nthings should resume in about 30 sec\n\nif nothing happens, hit F5 to reload the page",
		"tl_xe1": "could not list subfolders:\n\nerror ",
		"tl_xe2": "404: Folder not found",
		"fl_xe1": "could not list files in folder:\n\nerror ",
		"fl_xe2": "404: Folder not found",
		"fd_xe1": "could not create subfolder:\n\nerror ",
		"fd_xe2": "404: Parent folder not found",
		"fsm_xe1": "could not send message:\n\nerror ",
		"fsm_xe2": "404: Parent folder not found",
		"fu_xe1": "failed to load unpost list from server:\n\nerror ",
		"fu_xe2": "404: File not found??",

		"fz_tar": "uncompressed gnu-tar file (linux / mac)",
		"fz_pax": "uncompressed pax-format tar (slower)",
		"fz_targz": "gnu-tar with gzip level 3 compression$N$Nthis is usually very slow, so$Nuse uncompressed tar instead",
		"fz_tarxz": "gnu-tar with xz level 1 compression$N$Nthis is usually very slow, so$Nuse uncompressed tar instead",
		"fz_zip8": "zip with utf8 filenames (maybe wonky on windows 7 and older)",
		"fz_zipd": "zip with traditional cp437 filenames, for really old software",
		"fz_zipc": "cp437 with crc32 computed early,$Nfor MS-DOS PKZIP v2.04g (october 1993)$N(takes longer to process before download can start)",

		"un_m1": "you can delete your recent uploads (or abort unfinished ones) below",
		"un_upd": "refresh",
		"un_m4": "or share the files visible below:",
		"un_ulist": "show",
		"un_ucopy": "copy",
		"un_flt": "optional filter:&nbsp; URL must contain",
		"un_fclr": "clear filter",
		"un_derr": 'unpost-delete failed:\n',
		"un_f5": 'something broke, please try a refresh or hit F5',
		"un_uf5": "sorry but you have to refresh the page (for example by pressing F5 or CTRL-R) before this upload can be aborted",
		"un_nou": '<b>warning:</b> server too busy to show unfinished uploads; click the "refresh" link in a bit',
		"un_noc": '<b>warning:</b> unpost of fully uploaded files is not enabled/permitted in server config',
		"un_max": "showing first 2000 files (use the filter)",
		"un_avail": "{0} recent uploads can be deleted<br />{1} unfinished ones can be aborted",
		"un_m2": "sorted by upload time; most recent first:",
		"un_no1": "sike! no uploads are sufficiently recent",
		"un_no2": "sike! no uploads matching that filter are sufficiently recent",
		"un_next": "delete the next {0} files below",
		"un_abrt": "abort",
		"un_del": "delete",
		"un_m3": "loading your recent uploads...",
		"un_busy": "deleting {0} files...",
		"un_clip": "{0} links copied to clipboard",

		"u_https1": "you should",
		"u_https2": "switch to https",
		"u_https3": "for better performance",
		"u_ancient": 'your browser is impressively ancient -- maybe you should <a href="#" onclick="goto(\'bup\')">use bup instead</a>',
		"u_nowork": "need firefox 53+ or chrome 57+ or iOS 11+",
		"u_nodrop": 'your browser is too old for drag-and-drop uploading',
		"u_notdir": "that's not a folder!\n\nyour browser is too old,\nplease try dragdrop instead",
		"u_uri": "to dragdrop images from other browser windows,\nplease drop it onto the big upload button",
		"u_enpot": 'switch to <a href="#">potato UI</a> (may improve upload speed)',
		"u_depot": 'switch to <a href="#">fancy UI</a> (may reduce upload speed)',
		"u_gotpot": 'switching to the potato UI for improved upload speed,\n\nfeel free to disagree and switch back!',
		"u_pott": "<p>files: &nbsp; <b>{0}</b> finished, &nbsp; <b>{1}</b> failed, &nbsp; <b>{2}</b> busy, &nbsp; <b>{3}</b> queued</p>",
		"u_ever": "this is the basic uploader; up2k needs at least<br>chrome 21 // firefox 13 // edge 12 // opera 12 // safari 5.1",
		"u_su2k": 'this is the basic uploader; <a href="#" id="u2yea">up2k</a> is better',
		"u_ewrite": 'you do not have write-access to this folder',
		"u_eread": 'you do not have read-access to this folder',
		"u_enoi": 'file-search is not enabled in server config',
		"u_badf": 'These {0} files (of {1} total) were skipped, possibly due to filesystem permissions:\n\n',
		"u_blankf": 'These {0} files (of {1} total) are blank / empty; upload them anyways?\n\n',
		"u_just1": '\nMaybe it works better if you select just one file',
		"u_ff_many": "if you're using <b>Linux / MacOS / Android,</b> then this amount of files <a href=\"https://bugzilla.mozilla.org/show_bug.cgi?id=1790500\" target=\"_blank\"><em>may</em> crash Firefox!</a>\nif that happens, please try again (or use Chrome).",
		"u_up_life": "This upload will be deleted from the server\n{0} after it completes",
		"u_asku": 'upload these {0} files to <code>{1}</code>',
		"u_unpt": "you can undo / delete this upload using the top-left 🧯",
		"u_bigtab": 'about to show {0} files\n\nthis may crash your browser, are you sure?',
		"u_scan": 'Scanning files...',
		"u_dirstuck": 'directory iterator got stuck trying to access the following {0} items; will skip:',
		"u_etadone": 'Done ({0}, {1} files)',
		"u_etaprep": '(preparing to upload)',
		"u_hashdone": 'hashing done',
		"u_hashing": 'hash',
		"u_hs": 'handshaking...',
		"u_dupdefer": "duplicate; will be processed after all other files",
		"u_actx": "click this text to prevent loss of<br />performance when switching to other windows/tabs",
		"u_fixed": "OK!&nbsp; Fixed it 👍",
		"u_cuerr": "failed to upload chunk {0} of {1};\nprobably harmless, continuing\n\nfile: {2}",
		"u_cuerr2": "server rejected upload (chunk {0} of {1});\nwill retry later\n\nfile: {2}\n\nerror ",
		"u_ehstmp": "will retry; see bottom-right",
		"u_ehsfin": "server rejected the request to finalize upload; retrying...",
		"u_ehssrch": "server rejected the request to perform search; retrying...",
		"u_ehsinit": "server rejected the request to initiate upload; retrying...",
		"u_eneths": "network error while performing upload handshake; retrying...",
		"u_enethd": "network error while testing target existence; retrying...",
		"u_cbusy": "waiting for server to trust us again after a network glitch...",
		"u_ehsdf": "server ran out of disk space!\n\nwill keep retrying, in case someone\nfrees up enough space to continue",
		"u_emtleak1": "it looks like your webbrowser may have a memory leak;\nplease",
		"u_emtleak2": ' <a href="{0}">switch to https (recommended)</a> or ',
		"u_emtleak3": ' ',
		"u_emtleakc": 'try the following:\n<ul><li>hit <code>F5</code> to refresh the page</li><li>then disable the &nbsp;<code>mt</code>&nbsp; button in the &nbsp;<code>⚙️ settings</code></li><li>and try that upload again</li></ul>Uploads will be a bit slower, but oh well.\nSorry for the trouble !\n\nPS: chrome v107 <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1354816" target="_blank">has a bugfix</a> for this',
		"u_emtleakf": 'try the following:\n<ul><li>hit <code>F5</code> to refresh the page</li><li>then enable <code>🥔</code> (potato) in the upload UI<li>and try that upload again</li></ul>\nPS: firefox <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1790500" target="_blank">will hopefully have a bugfix</a> at some point',
		"u_s404": "not found on server",
		"u_expl": "explain",
		"u_maxconn": "most browsers limit this to 6, but firefox lets you raise it with <code>connections-per-server</code> in <code>about:config</code>",
		"u_tu": '<p class="warn">WARNING: turbo enabled, <span>&nbsp;client may not detect and resume incomplete uploads; see turbo-button tooltip</span></p>',
		"u_ts": '<p class="warn">WARNING: turbo enabled, <span>&nbsp;search results can be incorrect; see turbo-button tooltip</span></p>',
		"u_turbo_c": "turbo is disabled in server config",
		"u_turbo_g": "disabling turbo because you don't have\ndirectory listing privileges within this volume",
		"u_life_cfg": 'autodelete after <input id="lifem" p="60" /> min (or <input id="lifeh" p="3600" /> hours)',
		"u_life_est": 'upload will be deleted <span id="lifew" tt="local time">---</span>',
		"u_life_max": 'this folder enforces a\nmax lifetime of {0}',
		"u_unp_ok": 'unpost is allowed for {0}',
		"u_unp_ng": 'unpost will NOT be allowed',
		"ue_ro": 'your access to this folder is Read-Only\n\n',
		"ue_nl": 'you are currently not logged in',
		"ue_la": 'you are currently logged in as "{0}"',
		"ue_sr": 'you are currently in file-search mode\n\nswitch to upload-mode by clicking the magnifying glass 🔎 (next to the big SEARCH button), and try uploading again\n\nsorry',
		"ue_ta": 'try uploading again, it should work now',
		"ur_1uo": "OK: File uploaded successfully",
		"ur_auo": "OK: All {0} files uploaded successfully",
		"ur_1so": "OK: File found on server",
		"ur_aso": "OK: All {0} files found on server",
		"ur_1un": "Upload failed, sorry",
		"ur_aun": "All {0} uploads failed, sorry",
		"ur_1sn": "File was NOT found on server",
		"ur_asn": "The {0} files were NOT found on server",
		"ur_um": "Finished;\n{0} uploads OK,\n{1} uploads failed, sorry",
		"ur_sm": "Finished;\n{0} files found on server,\n{1} files NOT found on server",

		"lang_set": "refresh to make the change take effect?",
	},
	"nor": {
		"tt": "Norsk",

		"cols": {
			"c": "handlingsknapper",
			"dur": "varighet",
			"q": "kvalitet / bitrate",
			"Ac": "lyd-format",
			"Vc": "video-format",
			"Fmt": "format / innpakning",
			"Ahash": "lyd-kontrollsum",
			"Vhash": "video-kontrollsum",
			"Res": "oppløsning",
			"T": "filtype",
			"aq": "lydkvalitet / bitrate",
			"vq": "videokvalitet / bitrate",
			"pixfmt": "fargekoding / detaljenivå",
			"resw": "horisontal oppløsning",
			"resh": "vertikal oppløsning",
			"chs": "lydkanaler",
			"hz": "lyd-oppløsning"
		},

		"hks": [
			[
				"ymse",
				["ESC", "lukk saker og ting"],

				"filbehandler",
				["G", "listevisning eller ikoner"],
				["T", "miniatyrbilder på/av"],
				["🡅 A/D", "ikonstørrelse"],
				["ctrl-K", "slett valgte"],
				["ctrl-X", "klipp ut"],
				["ctrl-V", "lim inn"],
				["Y", "last ned valgte"],
				["F2", "endre navn på valgte"],

				"filmarkering",
				["space", "marker fil"],
				["🡑/🡓", "flytt markør"],
				["ctrl 🡑/🡓", "flytt markør og scroll"],
				["🡅 🡑/🡓", "velg forr./neste fil"],
				["ctrl-A", "velg alle filer / mapper"],
			], [
				"navigering",
				["B", "mappehierarki eller filsti"],
				["I/K", "forr./neste mappe"],
				["M", "ett nivå opp (eller lukk)"],
				["V", "vis mapper eller tekstfiler"],
				["A/D", "panelstørrelse"],
			], [
				"musikkspiller",
				["J/L", "forr./neste sang"],
				["U/O", "hopp 10sek bak/frem"],
				["0..9", "hopp til 0%..90%"],
				["P", "pause, eller start / fortsett"],
				["Y", "last ned sang"],
			], [
				"bildeviser",
				["J/L, ←/→", "forr./neste bilde"],
				["Home/End", "første/siste bilde"],
				["F", "fullskjermvisning"],
				["R", "rotere mot høyre"],
				["🡅 R", "rotere mot venstre"],
				["Y", "last ned bilde"],
			], [
				"videospiller",
				["U/O", "hopp 10sek bak/frem"],
				["P/K/Space", "pause / fortsett"],
				["C", "fortsett til neste fil"],
				["V", "gjenta avspilling"],
				["M", "lyd av/på"],
				["[ og ]", "gjentaksintervall"],
			], [
				"dokumentviser",
				["I/K", "forr./neste fil"],
				["M", "lukk tekstdokument"],
				["E", "rediger tekstdokument"],
				["S", "velg fil (for F2/ctrl-x/...)"],
				["Y", "last ned tekstfil"],
			]
		],

		"m_ok": "OK",
		"m_ng": "Avbryt",

		"enable": "Aktiv",
		"danger": "VARSKU",
		"clipped": "kopiert til utklippstavlen",

		"ht_s": "sekund!er",
		"ht_m": "minutt!er",
		"ht_h": "time!r",
		"ht_d": "dag!er",
		"ht_and": " og ",

		"goh": "kontrollpanel",
		"gop": 'naviger til mappen før denne">forr.',
		"gou": 'naviger ett nivå opp">opp',
		"gon": 'naviger til mappen etter denne">neste',
		"logout": "Logg ut ",
		"access": " tilgang",
		"ot_close": "lukk verktøy",
		"ot_search": "søk etter filer ved å angi filnavn, mappenavn, tid, størrelse, eller metadata som sangtittel / artist / osv.$N$N&lt;code&gt;foo bar&lt;/code&gt; = inneholder både «foo» og «bar»,$N&lt;code&gt;foo -bar&lt;/code&gt; = inneholder «foo» men ikke «bar»,$N&lt;code&gt;^yana .opus$&lt;/code&gt; = starter med «yana», filtype «opus»$N&lt;code&gt;&quot;try unite&quot;&lt;/code&gt; = «try unite» eksakt$N$Ndatoformat er iso-8601, så f.eks.$N&lt;code&gt;2009-12-31&lt;/code&gt; eller &lt;code&gt;2020-09-12 23:30:00&lt;/code&gt;",
		"ot_unpost": "unpost: slett filer som du nylig har lastet opp; «angre-knappen»",
		"ot_bup": "bup: tradisjonell / primitiv filopplastning,$N$Nfungerer i omtrent samtlige nettlesere",
		"ot_mkdir": "mkdir: lag en ny mappe",
		"ot_md": "new-md: lag et nytt markdown-dokument",
		"ot_msg": "msg: send en beskjed til serverloggen",
		"ot_mp": "musikkspiller-instillinger",
		"ot_cfg": "andre innstillinger",
		"ot_u2i": 'up2k: last opp filer (hvis du har skrivetilgang) eller bytt til søkemodus for å sjekke om filene finnes et-eller-annet sted på serveren$N$Nopplastninger kan gjenopptas etter avbrudd, skjer stykkevis for potensielt høyere ytelse, og ivaretar datostempling -- men bruker litt mer prosessorkraft enn [🎈]&nbsp; (den primitive opplasteren "bup")<br /><br />mens opplastninger foregår så vises fremdriften her oppe!',
		"ot_u2w": 'up2k: filopplastning med støtte for å gjenoppta avbrutte opplastninger -- steng ned nettleseren og dra de samme filene inn i nettleseren igjen for å plukke opp igjen der du slapp$N$Nopplastninger skjer stykkevis for potensielt høyere ytelse, og ivaretar datostempling -- men bruker litt mer prosessorkraft enn [🎈]&nbsp; (den primitive opplasteren "bup")<br /><br />mens opplastninger foregår så vises fremdriften her oppe!',
		"ot_noie": 'Fungerer mye bedre i Chrome / Firefox / Edge',

		"ab_mkdir": "lag mappe",
		"ab_mkdoc": "nytt dokument",
		"ab_msg": "send melding",

		"ay_path": "gå videre til mapper",
		"ay_files": "gå videre til filer",

		"wt_ren": "gi nye navn til de valgte filene$NSnarvei: F2",
		"wt_del": "slett de valgte filene$NSnarvei: ctrl-K",
		"wt_cut": "klipp ut de valgte filene &lt;small&gt;(for å lime inn et annet sted)&lt;/small&gt;$NSnarvei: ctrl-X",
		"wt_pst": "lim inn filer (som tidligere ble klippet ut et annet sted)$NSnarvei: ctrl-V",
		"wt_selall": "velg alle filer$NSnarvei: ctrl-A (mens fokus er på en fil)",
		"wt_selinv": "inverter utvalg",
		"wt_selzip": "last ned de valgte filene som et arkiv",
		"wt_seldl": "last ned de valgte filene$NSnarvei: Y",
		"wt_npirc": "kopiér sang-info (irc-formattert)",
		"wt_nptxt": "kopiér sang-info",
		"wt_grid": "bytt mellom ikoner og listevisning$NSnarvei: G",
		"wt_prev": "forrige sang$NSnarvei: J",
		"wt_play": "play / pause$NSnarvei: P",
		"wt_next": "neste sang$NSnarvei: L",

		"ul_par": "samtidige handl.:",
		"ut_rand": "finn opp nye tilfeldige filnavn",
		"ut_u2ts": "gi filen på serveren samme$Ntidsstempel som lokalt hos deg",
		"ut_mt": "fortsett å befare køen mens opplastning foregår$N$Nskru denne av dersom du har en$Ntreg prosessor eller harddisk",
		"ut_ask": 'bekreft filutvalg før opplastning starter">💭',
		"ut_pot": "forbedre ytelsen på trege enheter ved å$Nforenkle brukergrensesnittet",
		"ut_srch": "utfør søk istedenfor å laste opp --$Nleter igjennom alle mappene du har lov til å se",
		"ut_par": "sett til 0 for å midlertidig stanse opplastning$N$Nhøye verdier (4 eller 8) kan gi bedre ytelse,$Nspesielt på trege internettlinjer$N$Nbør ikke være høyere enn 1 på LAN$Neller hvis serveren sin harddisk er treg",
		"ul_btn": "slipp filer / mapper<br>her (eller klikk meg)",
		"ul_btnu": "L A S T &nbsp; O P P",
		"ul_btns": "F I L S Ø K",

		"ul_hash": "befar",
		"ul_send": "&nbsp;send",
		"ul_done": "total",
		"ul_idle1": "ingen handlinger i køen",
		"ut_etah": "snitthastighet for &lt;em&gt;befaring&lt;/em&gt; samt gjenstående tid",
		"ut_etau": "snitthastighet for &lt;em&gt;opplastning&lt;/em&gt; samt gjenstående tid",
		"ut_etat": "&lt;em&gt;total&lt;/em&gt; snitthastighet og gjenstående tid",

		"uct_ok": "fullført uten problemer",
		"uct_ng": "fullført under tvil (duplikat, ikke funnet, ...)",
		"uct_done": "fullført (enten &lt;em&gt;ok&lt;/em&gt; eller &lt;em&gt;ng&lt;/em&gt;)",
		"uct_bz": "aktive handlinger (befaring / opplastning)",
		"uct_q": "køen",

		"utl_name": "filnavn",
		"utl_ulist": "vis",
		"utl_ucopy": "kopiér",
		"utl_links": "lenker",
		"utl_stat": "status",
		"utl_prog": "fremdrift",

		// må være korte:
		"utl_404": "404",
		"utl_err": "FEIL!",
		"utl_oserr": "OS-feil",
		"utl_found": "funnet",
		"utl_defer": "senere",
		"utl_yolo": "YOLO",
		"utl_done": "ferdig",

		"ul_flagblk": "filene har blitt lagt i køen</b><br>men det er en annen nettleserfane som holder på med befaring eller opplastning akkurat nå,<br>så venter til den er ferdig først",
		"ul_btnlk": "bryteren har blitt låst til denne tilstanden i serverens konfigurasjon",

		"udt_up": "Last opp",
		"udt_srch": "Søk",
		"udt_drop": "Slipp filene her",

		"u_nav_m": '<h6>hva har du?</h6><code>Enter</code> = Filer (én eller flere)\n<code>ESC</code> = Én mappe (inkludert undermapper)',
		"u_nav_b": '<a href="#" id="modal-ok">Filer</a><a href="#" id="modal-ng">Én mappe</a>',

		"cl_opts": "brytere",
		"cl_themes": "utseende",
		"cl_langs": "språk",
		"cl_ziptype": "nedlastning av mapper",
		"cl_uopts": "up2k-brytere",
		"cl_favico": "favicon",
		"cl_bigdir": "store mapper",
		"cl_keytype": "notasjon for musikalsk dur",
		"cl_hiddenc": "skjulte kolonner",
		"cl_hidec": "skjul",
		"cl_reset": "nullstill",
		"cl_hpick": "klikk på overskriften til kolonnene du ønsker å skjule i tabellen nedenfor",
		"cl_hcancel": "kolonne-skjuling avbrutt",

		"ct_grid": '田 ikoner',
		"ct_ttips": 'hvis hjelpetekst ved å holde musen over ting">ℹ️ tips',
		"ct_thumb": 'vis miniatyrbilder istedenfor ikoner$NSnarvei: T">🖼️ bilder',
		"ct_csel": 'bruk tastene CTRL og SHIFT for markering av filer i ikonvisning">merk',
		"ct_ihop": 'bla ned til sist viste bilde når bildeviseren lukkes">g⮯',
		"ct_dots": 'vis skjulte filer (gitt at serveren tillater det)">.synlig',
		"ct_dir1st": 'sorter slik at mapper kommer foran filer">📁 først',
		"ct_readme": 'vis README.md nedenfor filene">📜 readme',
		"ct_idxh": 'vis index.html istedenfor fil-liste">htm',
		"ct_sbars": 'vis rullgardiner / skrollefelt">⟊',

		"cut_umod": 'i tilfelle en fil du laster opp allerede finnes på serveren, så skal serverens tidsstempel oppdateres slik at det stemmer overens med din lokale fil (krever rettighetene write+delete)">re📅',

		"cut_turbo": "forenklet befaring ved opplastning; bør sannsynlig <em>ikke</em> skrus på:$N$Nnyttig dersom du var midt i en svær opplastning som måtte restartes av en eller annen grunn, og du vil komme igang igjen så raskt som overhodet mulig.$N$Nnår denne er skrudd på så forenkles befaringen kraftig; istedenfor å utføre en trygg sjekk på om filene finnes på serveren i god stand, så sjekkes kun om <em>filstørrelsen</em> stemmer. Så dersom en korrupt fil skulle befinne seg på serveren allerede, på samme sted med samme størrelse og navn, så blir det <em>ikke oppdaget</em>.$N$Ndet anbefales å kun benytte denne funksjonen for å komme seg raskt igjennom selve opplastningen, for så å skru den av, og til slutt &quot;laste opp&quot; de samme filene én gang til -- slik at integriteten kan verifiseres\">turbo",

		"cut_datechk": "har ingen effekt dersom turbo er avslått$N$Ngjør turbo bittelitt tryggere ved å sjekke datostemplingen på filene (i tillegg til filstørrelse)$N$N<em>burde</em> oppdage og gjenoppta de fleste ufullstendige opplastninger, men er <em>ikke</em> en fullverdig erstatning for å deaktivere turbo og gjøre en skikkelig sjekk\">date-chk",

		"cut_u2sz": "størrelse i megabyte for hvert bruddstykke for opplastning. Store verdier flyr bedre over atlanteren. Små verdier kan være bedre på særdeles ustabile forbindelser",

		"cut_flag": "samkjører nettleserfaner slik at bare én $N kan holde på med befaring / opplastning $N -- andre faner må også ha denne skrudd på $N -- fungerer kun innenfor samme domene",

		"cut_az": "last opp filer i alfabetisk rekkefølge, istedenfor minste-fil-først$N$Nalfabetisk kan gjøre det lettere å anslå om alt gikk bra, men er bittelitt tregere på fiber / LAN",

		"cut_nag": "meldingsvarsel når opplastning er ferdig$N(kun on nettleserfanen ikke er synlig)",
		"cut_sfx": "lydvarsel når opplastning er ferdig$N(kun on nettleserfanen ikke er synlig)",

		"cut_mt": "raskere befaring ved å bruke hele CPU'en$N$Ndenne funksjonen anvender web-workers$Nog krever mer RAM (opptil 512 MiB ekstra)$N$N30% raskere https, 4.5x raskere http,$Nog 5.3x raskere på android-telefoner\">mt",

		"cft_text": "ikontekst (blank ut og last siden på nytt for å deaktivere)",
		"cft_fg": "farge",
		"cft_bg": "bakgrunnsfarge",

		"cdt_lim": "maks antall filer å vise per mappe",
		"cdt_ask": "vis knapper for å laste flere filer nederst på siden istedenfor å gradvis laste mer av mappen når man scroller ned",

		"tt_entree": "bytt til mappehierarki$NSnarvei: B",
		"tt_detree": "bytt til tradisjonell sti-visning$NSnarvei: B",
		"tt_visdir": "bla ned til den åpne mappen",
		"tt_ftree": "bytt mellom filstruktur og tekstfiler$NSnarvei: V",
		"tt_pdock": "vis de overordnede mappene i et panel",
		"tt_dynt": "øk bredden på panelet ettersom treet utvider seg",
		"tt_wrap": "linjebryting",
		"tt_hover": "vis hele mappenavnet når musepekeren treffer mappen$N( gjør dessverre at scrollhjulet fusker dersom musepekeren ikke befinner seg i grøfta )",

		"ml_pmode": "ved enden av mappen",
		"ml_btns": "knapper",
		"ml_tcode": "konvertering",
		"ml_tint": "tint",
		"ml_eq": "audio equalizer (tonejustering)",
		"ml_drc": "compressor (volum-utjevning)",

		"mt_shuf": "sangene i hver mappe$Nspilles i tilfeldig rekkefølge\">🔀",
		"mt_aplay": "forsøk å starte avspilling hvis linken du klikket på for å åpne nettsiden inneholder en sang-ID$N$Nhvis denne deaktiveres så vil heller ikke nettside-URLen bli oppdatert med sang-ID'er når musikk spilles, i tilfelle innstillingene skulle gå tapt og nettsiden lastes på ny\">a▶",
		"mt_preload": "hent ned litt av neste sang i forkant,$Nslik at pausen i overgangen blir mindre\">forles",
		"mt_prescan": "ved behov, bla til neste mappe$Nslik at nettleseren lar oss$Nfortsette å spille musikk\">bla",
		"mt_fullpre": "hent ned hele neste sang, ikke bare litt:$N✅ skru på hvis nettet ditt er <b>ustabilt</b>,$N❌ skru av hvis nettet ditt er <b>tregt</b>\">full",
		"mt_fau": "for telefoner: forhindre at avspilling stopper hvis nettet er for tregt til å laste neste sang i tide. Hvis påskrudd, kan forårsake at sang-info ikke vises korrekt i OS'et\">☕️",
		"mt_waves": "waveform seekbar:$Nvis volumkurve i avspillingsfeltet\">~s",
		"mt_npclip": "vis knapper for å kopiere info om sangen du hører på\">/np",
		"mt_octl": "integrering med operativsystemet (fjernkontroll, info-skjerm)\">os-ctl",
		"mt_oseek": "tillat spoling med fjernkontroll$N$Nmerk: på noen enheter (iPhones) så vil$Ndette erstatte knappen for neste sang\">spoling",
		"mt_oscv": "vis album-cover på infoskjermen\">bilde",
		"mt_follow": "bla slik at sangen som spilles alltid er synlig\">🎯",
		"mt_compact": "tettpakket avspillerpanel\">⟎",
		"mt_uncache": "prøv denne hvis en sang ikke spiller riktig\">uncache",
		"mt_mloop": "repeter hele mappen\">🔁 gjenta",
		"mt_mnext": "hopp til neste mappe og fortsett\">📂 neste",
		"mt_cflac": "konverter flac / wav-filer til opus\">flac",
		"mt_caac": "konverter aac / m4a-filer til to opus\">aac",
		"mt_coth": "konverter alt annet (men ikke mp3) til opus\">andre",
		"mt_tint": "nivå av bakgrunnsfarge på søkestripa (0-100),$Ngjør oppdateringer mindre distraherende",
		"mt_eq": "aktiver tonekontroll og forsterker;$N$Nboost &lt;code&gt;0&lt;/code&gt; = normal volumskala$N$Nwidth &lt;code&gt;1 &nbsp;&lt;/code&gt; = normal stereo$Nwidth &lt;code&gt;0.5&lt;/code&gt; = 50% blanding venstre-høyre$Nwidth &lt;code&gt;0 &nbsp;&lt;/code&gt; = mono$N$Nboost &lt;code&gt;-0.8&lt;/code&gt; &amp; width &lt;code&gt;10&lt;/code&gt; = instrumental :^)$N$Nreduserer også dødtid imellom sangfiler",
		"mt_drc": "aktiver volum-utjevning (dynamic range compressor); vil også aktivere tonejustering, så sett alle EQ-feltene bortsett fra 'width' til 0 hvis du ikke vil ha noe EQ$N$Nfilteret vil dempe volumet på alt som er høyere enn TRESH dB; for hver RATIO dB over grensen er det 1dB som treffer høyttalerne, så standardverdiene tresh -24 og ratio 12 skal bety at volumet ikke går høyere enn -22 dB, slik at man trygt kan øke boost-verdien i equalizer'n til rundt 0.8, eller 1.8 kombinert med ATK 0 og RLS 90 (bare mulig i firefox; andre nettlesere tar ikke høyere RLS enn 1)$N$Nwikipedia forklarer dette mye bedre forresten",

		"mb_play": "lytt",
		"mm_hashplay": "spill denne sangen?",
		"mp_breq": "krever firefox 82+, chrome 73+, eller iOS 15+",
		"mm_bload": "laster inn...",
		"mm_bconv": "konverterer til {0}, vent litt...",
		"mm_opusen": "nettleseren din forstår ikke aac / m4a;\nkonvertering til opus er nå aktivert",
		"mm_playerr": "avspilling feilet: ",
		"mm_eabrt": "Avspillingsforespørselen ble avbrutt",
		"mm_enet": "Nettet ditt er ustabilt",
		"mm_edec": "Noe er galt med musikkfilen",
		"mm_esupp": "Nettleseren din forstår ikke filtypen",
		"mm_eunk": "Ukjent feil",
		"mm_e404": "Avspilling feilet: Fil ikke funnet.",
		"mm_e403": "Avspilling feilet: Tilgang nektet.\n\nKanskje du ble logget ut?\nPrøv å trykk F5 for å laste siden på nytt.",
		"mm_e5xx": "Avspilling feilet: ",
		"mm_nof": "finner ikke flere sanger i nærheten",
		"mm_prescan": "Leter etter neste sang...",
		"mm_scank": "Fant neste sang:",
		"mm_uncache": "alle sanger vil lastes på nytt ved neste avspilling",
		"mm_hnf": "sangen finnes ikke lenger",

		"im_hnf": "bildet finnes ikke lenger",

		"f_empty": 'denne mappen er tom',
		"f_chide": 'dette vil skjule kolonnen «{0}»\n\nfanen for "andre innstillinger" lar deg vise kolonnen igjen',
		"f_bigtxt": "denne filen er hele {0} MiB -- vis som tekst?",
		"fbd_more": '<div id="blazy">viser <code>{0}</code> av <code>{1}</code> filer; <a href="#" id="bd_more">vis {2}</a> eller <a href="#" id="bd_all">vis alle</a></div>',
		"fbd_all": '<div id="blazy">viser <code>{0}</code> av <code>{1}</code> filer; <a href="#" id="bd_all">vis alle</a></div>',

		"f_dls": 'linkene i denne mappen er nå\nomgjort til nedlastningsknapper',

		"f_partial": "For å laste ned en fil som enda ikke er ferdig opplastet, klikk på filen som har samme filnavn som denne, men uten <code>.PARTIAL</code> på slutten. Da vil serveren passe på at nedlastning går bra. Derfor anbefales det sterkt å trykke ABRYT eller Escape-tasten.\n\nHvis du virkelig ønsker å laste ned denne <code>.PARTIAL</code>-filen på en ukontrollert måte, trykk OK / Enter for å ignorere denne advarselen. Slik vil du høyst sannsynlig motta korrupt data.",

		"ft_paste": "Lim inn {0} filer$NSnarvei: ctrl-V",
		"fr_eperm": 'kan ikke endre navn:\ndu har ikke “move”-rettigheten i denne mappen',
		"fd_eperm": 'kan ikke slette:\ndu har ikke “delete”-rettigheten i denne mappen',
		"fc_eperm": 'kan ikke klippe ut:\ndu har ikke “move”-rettigheten i denne mappen',
		"fp_eperm": 'kan ikke lime inn:\ndu har ikke “write”-rettigheten i denne mappen',
		"fr_emore": "velg minst én fil som skal få nytt navn",
		"fd_emore": "velg minst én fil som skal slettes",
		"fc_emore": "velg minst én fil som skal klippes ut",

		"fs_sc": "del mappen du er i nå",
		"fs_ss": "del de valgte filene",
		"fs_just1d": "du kan ikke markere flere mapper samtidig,\neller kombinere mapper og filer",
		"fs_abrt": "❌ avbryt",
		"fs_rand": "🎲 tilfeldig navn",
		"fs_go": "✅ opprett deling",
		"fs_name": "navn",
		"fs_src": "kilde",
		"fs_pwd": "passord",
		"fs_exp": "varighet",
		"fs_tmin": "min",
		"fs_thrs": "timer",
		"fs_tdays": "dager",
		"fs_never": "for evig",
		"fs_pname": "frivillig navn (blir noe tilfeldig ellers)",
		"fs_tsrc": "fil/mappe som skal deles",
		"fs_ppwd": "frivillig passord",
		"fs_w8": "oppretter deling...",
		"fs_ok": "<h6>URL opprettet</h6>\ntrykk <code>Enter/OK</code> for å kopiere linken (for CTRL-V)\ntrykk <code>ESC/Avbryt</code> for å bare bekrefte\n\n",

		"frt_dec": "kan korrigere visse ødelagte filnavn\">url-decode",
		"frt_rst": "nullstiller endringer (tilbake til de originale filnavnene)\">↺ reset",
		"frt_abrt": "avbryt og lukk dette vinduet\">❌ avbryt",
		"frb_apply": "IVERKSETT",
		"fr_adv": "automasjon basert på metadata<br>og / eller mønster (regulære uttrykk)\">avansert",
		"fr_case": "versalfølsomme uttrykk\">Aa",
		"fr_win": "bytt ut bokstavene <code>&lt;&gt;:&quot;\\|?*</code> med$Ntilsvarende som windows ikke får panikk av\">win",
		"fr_slash": "bytt ut bokstaven <code>/</code> slik at den ikke forårsaker at nye mapper opprettes\">ikke /",
		"fr_re": "regex-mønster som kjøres på hvert filnavn. Grupper kan leses ut i format-feltet nedenfor, f.eks. &lt;code&gt;(1)&lt;/code&gt; og &lt;code&gt;(2)&lt;/code&gt; osv.",
		"fr_fmt": "inspirert av foobar2000:$N&lt;code&gt;(title)&lt;/code&gt; byttes ut med sangtittel,$N&lt;code&gt;[(artist) - ](title)&lt;/code&gt; dropper [dette] hvis artist er blank$N&lt;code&gt;$lpad((tn),2,0)&lt;/code&gt; viser sangnr. med 2 siffer",
		"fr_pdel": "slett",
		"fr_pnew": "lagre som",
		"fr_pname": "gi innstillingene dine et navn",
		"fr_aborted": "avbrutt",
		"fr_lold": "gammelt navn",
		"fr_lnew": "nytt navn",
		"fr_tags": "metadata for de valgte filene (kun for referanse):",
		"fr_busy": "endrer navn på {0} filer...\n\n{1}",
		"fr_efail": "endring av navn feilet:\n",
		"fr_nchg": "{0} av navnene ble justert pga. <code>win</code> og/eller <code>ikke /</code>\n\nvil du fortsette med de nye navnene som ble valgt?",

		"fd_ok": "sletting OK",
		"fd_err": "sletting feilet:\n",
		"fd_none": "ingenting ble slettet; kanskje avvist av serverkonfigurasjon (xbd)?",
		"fd_busy": "sletter {0} filer...\n\n{1}",
		"fd_warn1": "SLETT disse {0} filene?",
		"fd_warn2": "<b>Siste sjanse!</b> Dette kan ikke angres. Slett?",

		"fc_ok": "klippet ut {0} filer",
		"fc_warn": 'klippet ut {0} filer\n\nmen: kun <b>denne</b> nettleserfanen har mulighet til å lime dem inn et annet sted, siden antallet filer er helt hinsides',

		"fp_ecut": "du må klippe ut noen filer / mapper først\n\nmerk: du kan gjerne jobbe på kryss av nettleserfaner; klippe ut i én fane, lime inn i en annen",
		"fp_ename": "disse {0} filene kan ikke flyttes til målmappen fordi det allerede finnes filer med samme navn:",
		"fp_ok": "flytting OK",
		"fp_busy": "flytter {0} filer...\n\n{1}",
		"fp_err": "flytting feilet:\n",
		"fp_confirm": "flytt disse {0} filene hit?",
		"fp_etab": 'kunne ikke lese listen med filer ifra den andre nettleserfanen',
		"fp_name": "Laster opp én fil fra enheten din. Velg filnavn:",
		"fp_both_m": '<h6>hva skal limes inn her?</h6><code>Enter</code> = Flytt {0} filer fra «{1}»\n<code>ESC</code> = Last opp {2} filer fra enheten din',
		"fp_both_b": '<a href="#" id="modal-ok">Flytt</a><a href="#" id="modal-ng">Last opp</a>',

		"mk_noname": "skriv inn et navn i tekstboksen til venstre først :p",

		"tv_load": "Laster inn tekstfil:\n\n{0}\n\n{1}% ({2} av {3} MiB lastet ned)",
		"tv_xe1": "kunne ikke laste tekstfil:\n\nfeil ",
		"tv_xe2": "404, Fil ikke funnet",
		"tv_lst": "tekstfiler i mappen",
		"tvt_close": "gå tilbake til mappen$NSnarvei: M (eller Esc)\">❌ lukk",
		"tvt_dl": "last ned denne filen$NSnarvei: Y\">💾 last ned",
		"tvt_prev": "vis forrige dokument$NSnarvei: i\">⬆ forr.",
		"tvt_next": "vis neste dokument$NSnarvei: K\">⬇ neste",
		"tvt_sel": "markér filen &nbsp; ( for utklipp / sletting / ... )$NSnarvei: S\">merk",
		"tvt_edit": "redigér filen$NSnarvei: E\">✏️ endre",

		"gt_vau": "ikke vis videofiler, bare spill lyden\">🎧",
		"gt_msel": "markér filer istedenfor å åpne dem; ctrl-klikk filer for å overstyre$N$N&lt;em&gt;når aktiv: dobbelklikk en fil / mappe for å åpne&lt;/em&gt;$N$NSnarvei: S\">markering",
		"gt_crop": "beskjær ikonene så de passer bedre\">✂",
		"gt_3x": "høyere oppløsning på ikoner\">3x",
		"gt_zoom": "zoom",
		"gt_chop": "trim",
		"gt_sort": "sorter",
		"gt_name": "navn",
		"gt_sz": "størr.",
		"gt_ts": "dato",
		"gt_ext": "type",
		"gt_c1": "reduser maks-lengde på filnavn",
		"gt_c2": "øk maks-lengde på filnavn",

		"sm_w8": "søker...",
		"sm_prev": "søkeresultatene er fra et tidligere søk:\n  ",
		"sl_close": "lukk søkeresultater",
		"sl_hits": "viser {0} treff",
		"sl_moar": "hent flere",

		"s_sz": "størr.",
		"s_dt": "dato",
		"s_rd": "sti",
		"s_fn": "navn",
		"s_ta": "meta",
		"s_ua": "up@",
		"s_ad": "avns.",
		"s_s1": "større enn ↓ MiB",
		"s_s2": "mindre enn ↓ MiB",
		"s_d1": "nyere enn &lt;dato&gt;",
		"s_d2": "eldre enn",
		"s_u1": "lastet opp etter",
		"s_u2": "og/eller før",
		"s_r1": "mappenavn inneholder",
		"s_f1": "filnavn inneholder",
		"s_t1": "sang-info inneholder",
		"s_a1": "konkrete egenskaper",

		"md_eshow": "viser forenklet ",
		"md_off": "[📜<em>readme</em>] er avskrudd i [⚙️] -- dokument skjult",

		"badreply": "Ugyldig svar ifra serveren",

		"xhr403": "403: Tilgang nektet\n\nkanskje du ble logget ut? prøv å trykk F5",
		"xhr0": "ukjent (enten nettverksproblemer eller serverkrasj)",
		"cf_ok": "beklager -- liten tilfeldig kontroll, alt OK\n\nting skal fortsette om ca. 30 sekunder\n\nhvis ikkeno skjer, trykk F5 for å laste siden på nytt",
		"tl_xe1": "kunne ikke hente undermapper:\n\nfeil ",
		"tl_xe2": "404: Mappen finnes ikke",
		"fl_xe1": "kunne ikke hente filer i mappen:\n\nfeil ",
		"fl_xe2": "404: Mappen finnes ikke",
		"fd_xe1": "kan ikke opprette ny mappe:\n\nfeil ",
		"fd_xe2": "404: Den overordnede mappen finnes ikke",
		"fsm_xe1": "kunne ikke sende melding:\n\nfeil ",
		"fsm_xe2": "404: Den overordnede mappen finnes ikke",
		"fu_xe1": "kunne ikke hente listen med nylig opplastede filer ifra serveren:\n\nfeil ",
		"fu_xe2": "404: Filen finnes ikke??",

		"fz_tar": "ukomprimert gnu-tar arkiv, for linux og mac",
		"fz_pax": "ukomprimert pax-tar arkiv, litt tregere",
		"fz_targz": "gnu-tar pakket med gzip (nivå 3)$N$NNB: denne er veldig treg;$Nukomprimert tar er bedre",
		"fz_tarxz": "gnu-tar pakket med xz (nivå 1)$N$NNB: denne er veldig treg;$Nukomprimert tar er bedre",
		"fz_zip8": "zip med filnavn i utf8 (noe problematisk på windows 7 og eldre)",
		"fz_zipd": "zip med filnavn i cp437, for høggamle maskiner",
		"fz_zipc": "cp437 med tidlig crc32,$Nfor MS-DOS PKZIP v2.04g (oktober 1993)$N(øker behandlingstid på server)",

		"un_m1": "nedenfor kan du angre / slette filer som du nylig har lastet opp, eller avbryte ufullstendige opplastninger",
		"un_upd": "oppdater",
		"un_m4": "eller hvis du vil dele nedlastnings-lenkene:",
		"un_ulist": "vis",
		"un_ucopy": "kopiér",
		"un_flt": "valgfritt filter:&nbsp; filnavn / filsti må inneholde",
		"un_fclr": "nullstill filter",
		"un_derr": 'unpost-sletting feilet:\n',
		"un_f5": 'noe gikk galt, prøv å oppdatere listen eller trykk F5',
		"un_uf5": "beklager, men du må laste siden på nytt (f.eks. ved å trykke F5 eller CTRL-R) før denne opplastningen kan avbrytes",
		"un_nou": '<b>advarsel:</b> kan ikke vise ufullstendige opplastninger akkurat nå; klikk på oppdater-linken om litt',
		"un_noc": '<b>advarsel:</b> angring av fullførte opplastninger er deaktivert i serverkonfigurasjonen',
		"un_max": "viser de første 2000 filene (bruk filteret for å innsnevre)",
		"un_avail": "{0} nylig opplastede filer kan slettes<br />{1} ufullstendige opplastninger kan avbrytes",
		"un_m2": "sortert etter opplastningstid; nyeste først:",
		"un_no1": "men nei, her var det jaggu ikkeno som slettes kan",
		"un_no2": "men nei, her var det jaggu ingenting som passet overens med filteret",
		"un_next": "slett de neste {0} filene nedenfor",
		"un_abrt": "avbryt",
		"un_del": "slett",
		"un_m3": "henter listen med nylig opplastede filer...",
		"un_busy": "sletter {0} filer...",
		"un_clip": "{0} lenker kopiert til utklippstavlen",

		"u_https1": "du burde",
		"u_https2": "bytte til https",
		"u_https3": "for høyere hastighet",
		"u_ancient": 'nettleseren din er prehistorisk -- mulig du burde <a href="#" onclick="goto(\'bup\')">bruke bup istedenfor</a>',
		"u_nowork": "krever firefox 53+, chrome 57+, eller iOS 11+",
		"u_nodrop": 'nettleseren din er for gammel til å laste opp filer ved å dra dem inn i vinduet',
		"u_notdir": "mottok ikke mappen!\n\nnettleseren din er for gammel,\nprøv å dra mappen inn i vinduet istedenfor",
		"u_uri": "for å laste opp bilder ifra andre nettleservinduer,\nslipp bildet rett på den store last-opp-knappen",
		"u_enpot": 'bytt til <a href="#">enkelt UI</a> (gir sannsynlig raskere opplastning)',
		"u_depot": 'bytt til <a href="#">snæsent UI</a> (gir sannsynlig tregere opplastning)',
		"u_gotpot": 'byttet til et enklere UI for å laste opp raskere,\n\ndu kan gjerne bytte tilbake altså!',
		"u_pott": "<p>filer: &nbsp; <b>{0}</b> ferdig, &nbsp; <b>{1}</b> feilet, &nbsp; <b>{2}</b> behandles, &nbsp; <b>{3}</b> i kø</p>",
		"u_ever": "dette er den primitive opplasteren; up2k krever minst:<br>chrome 21 // firefox 13 // edge 12 // opera 12 // safari 5.1",
		"u_su2k": 'dette er den primitive opplasteren; <a href="#" id="u2yea">up2k</a> er bedre',
		"u_ewrite": 'du har ikke skrivetilgang i denne mappen',
		"u_eread": 'du har ikke lesetilgang i denne mappen',
		"u_enoi": 'filsøk er deaktivert i serverkonfigurasjonen',
		"u_badf": 'Disse {0} filene (av totalt {1}) kan ikke leses, kanskje pga rettighetsproblemer i filsystemet på datamaskinen din:\n\n',
		"u_blankf": 'Disse {0} filene (av totalt {1}) er blanke / uten innhold; ønsker du å laste dem opp uansett?\n\n',
		"u_just1": '\nFunker kanskje bedre hvis du bare tar én fil om gangen',
		"u_ff_many": 'Hvis du bruker <b>Linux / MacOS / Android,</b> så kan dette antallet filer<br /><a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1790500" target="_blank"><em>kanskje</em> krasje Firefox!</a> Hvis det skjer, så prøv igjen (eller bruk Chrome).',
		"u_up_life": "Filene slettes fra serveren {0}\netter at opplastningen er fullført",
		"u_asku": 'Laste opp disse {0} filene til <code>{1}</code>',
		"u_unpt": "Du kan angre / slette opplastningen med 🧯 oppe til venstre",
		"u_bigtab": 'Vil nå vise {0} filer...\n\nDette kan krasje nettleseren din. Fortsette?',
		"u_scan": 'Leser mappene...',
		"u_dirstuck": 'Nettleseren din fikk ikke tilgang til å lese følgende {0} filer/mapper, så de blir hoppet over:',
		"u_etadone": 'Ferdig ({0}, {1} filer)',
		"u_etaprep": '(forbereder opplastning)',
		"u_hashdone": 'befaring ferdig',
		"u_hashing": 'les',
		"u_hs": 'serveren tenker...',
		"u_dupdefer": "duplikat; vil bli håndtert til slutt",
		"u_actx": "klikk her for å forhindre tap av<br />ytelse ved bytte til andre vinduer/faner",
		"u_fixed": "OK!&nbsp; Løste seg 👍",
		"u_cuerr": "kunne ikke laste opp del {0} av {1};\nsikkert greit, fortsetter\n\nfil: {2}",
		"u_cuerr2": "server nektet opplastningen (del {0} av {1});\nprøver igjen senere\n\nfil: {2}\n\nerror ",
		"u_ehstmp": "prøver igjen; se mld nederst",
		"u_ehsfin": "server nektet forespørselen om å ferdigstille filen; prøver igjen...",
		"u_ehssrch": "server nektet forespørselen om å utføre søk; prøver igjen...",
		"u_ehsinit": "server nektet forespørselen om å begynne en ny opplastning; prøver igjen...",
		"u_eneths": "et problem med nettverket gjorde at avtale om opplastning ikke kunne inngås; prøver igjen...",
		"u_enethd": "et problem med nettverket gjorde at filsjekk ikke kunne utføres; prøver igjen...",
		"u_cbusy": "venter på klarering ifra server etter et lite nettverksglipp...",
		"u_ehsdf": "serveren er full!\n\nprøver igjen regelmessig,\ni tilfelle noen rydder litt...",
		"u_emtleak1": "uff, det er mulig at nettleseren din har en minnelekkasje...\nForeslår",
		"u_emtleak2": ' helst at du <a href="{0}">bytter til https</a>, eller ',
		"u_emtleak3": ' at du ',
		"u_emtleakc": 'prøver følgende:\n<ul><li>trykk F5 for å laste siden på nytt</li><li>så skru av &nbsp;<code>mt</code>&nbsp; bryteren under &nbsp;<code>⚙️ innstillinger</code></li><li>og forsøk den samme opplastningen igjen</li></ul>Opplastning vil gå litt tregere, men det får så være.\nBeklager bryderiet !\n\nPS: feilen <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1354816" target="_blank">skal være fikset</a> i chrome v107',
		"u_emtleakf": 'prøver følgende:\n<ul><li>trykk F5 for å laste siden på nytt</li><li>så skru på <code>🥔</code> ("enkelt UI") i opplasteren</li><li>og forsøk den samme opplastningen igjen</li></ul>\nPS: Firefox <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1790500" target="_blank">fikser forhåpentligvis feilen</a> en eller annen gang',
		"u_s404": "ikke funnet på serveren",
		"u_expl": "forklar",
		"u_maxconn": "de fleste nettlesere tillater ikke mer enn 6, men firefox lar deg øke grensen med <code>connections-per-server</code> i <code>about:config</code>",
		"u_tu": '<p class="warn">ADVARSEL: turbo er på, <span>&nbsp;avbrutte opplastninger vil muligens ikke oppdages og gjenopptas; hold musepekeren over turbo-knappen for mer info</span></p>',
		"u_ts": '<p class="warn">ADVARSEL: turbo er på, <span>&nbsp;søkeresultater kan være feil; hold musepekeren over turbo-knappen for mer info</span></p>',
		"u_turbo_c": "turbo er deaktivert i serverkonfigurasjonen",
		"u_turbo_g": 'turbo ble deaktivert fordi du ikke har\ntilgang til å se mappeinnhold i dette volumet',
		"u_life_cfg": 'slett opplastning etter <input id="lifem" p="60" /> min (eller <input id="lifeh" p="3600" /> timer)',
		"u_life_est": 'opplastningen slettes <span id="lifew" tt="lokal tid">---</span>',
		"u_life_max": 'denne mappen tillater ikke å \noppbevare filer i mer enn {0}',
		"u_unp_ok": 'opplastning kan angres i {0}',
		"u_unp_ng": 'opplastning kan IKKE angres',
		"ue_ro": 'du har ikke skrivetilgang i denne mappen\n\n',
		"ue_nl": 'du er ikke logget inn',
		"ue_la": 'du er logget inn som "{0}"',
		"ue_sr": 'du er i filsøk-modus\n\nbytt til opplastning ved å klikke på forstørrelsesglasset 🔎 (ved siden av den store FILSØK-knappen) og prøv igjen\n\nsorry',
		"ue_ta": 'prøv å laste opp igjen, det burde funke nå',
		"ur_1uo": "OK: Filen ble lastet opp",
		"ur_auo": "OK: Alle {0} filene ble lastet opp",
		"ur_1so": "OK: Filen ble funnet på serveren",
		"ur_aso": "OK: Alle {0} filene ble funnet på serveren",
		"ur_1un": "Opplastning feilet!",
		"ur_aun": "Alle {0} opplastningene gikk feil!",
		"ur_1sn": "Filen finnes IKKE på serveren",
		"ur_asn": "Fant INGEN av de {0} filene på serveren",
		"ur_um": "Ferdig;\n{0} opplastninger gikk bra,\n{1} opplastninger gikk feil",
		"ur_sm": "Ferdig;\n{0} filer ble funnet,\n{1} filer finnes IKKE på serveren",

		"lang_set": "passer det å laste siden på nytt?",
	},

	"chi": {
		// 以 //m 结尾的行是未经验证的机器翻译
		"tt": "中文",
		"cols": {
			"c": "操作按钮",
			"dur": "持续时间",
			"q": "质量 / 比特率",
			"Ac": "音频编码",
			"Vc": "视频编码",
			"Fmt": "格式 / 容器",
			"Ahash": "音频校验和",
			"Vhash": "视频校验和",
			"Res": "分辨率",
			"T": "文件类型",
			"aq": "音频质量 / 比特率",
			"vq": "视频质量 / 比特率",
			"pixfmt": "子采样 / 像素结构",
			"resw": "水平分辨率",
			"resh": "垂直分辨率",
			"chs": "音频频道",
			"hz": "采样率"
		},

		"hks": [
			[
				"misc",
				["ESC", "关闭各种窗口"],

				"file-manager",
				["G", "切换列表 / 网格视图"],
				["T", "切换缩略图 / 图标"],
				["🡅 A/D", "缩略图大小"],
				["ctrl-K", "删除选中项"],
				["ctrl-X", "剪切选中项"],
				["ctrl-V", "粘贴到文件夹"],
				["Y", "下载选中项"],
				["F2", "重命名选中项"],

				"file-list-sel",
				["space", "切换文件选择"],
				["🡑/🡓", "移动选择光标"],
				["ctrl 🡑/🡓", "移动光标和视图"],
				["🡅 🡑/🡓", "选择上一个/下一个文件"],
				["ctrl-A", "选择所有文件 / 文件夹"]
			], [
				"navigation",
				["B", "切换面包屑导航 / 导航窗格"],
				["I/K", "前一个/下一个文件夹"],
				["M", "父文件夹（或折叠当前文件夹）"],
				["V", "切换导航窗格中的文件夹 / 文本文件"],
				["A/D", "导航窗格大小"]
			], [
				"audio-player",
				["J/L", "上一首/下一首歌曲"],
				["U/O", "跳过10秒向前/向后"],
				["0..9", "跳转到0%..90%"],
				["P",  "播放/暂停（也可以启动）"],
				["Y", "下载歌曲"]
			], [
				"image-viewer",
				["J/L, ←/→", "上一张/下一张图片"],
				["Home/End", "第一张/最后一张图片"],
				["F", "全屏"],
				["R", "顺时针旋转"],
				["🡅 R", "逆时针旋转"],
				["Y", "下载图片"]
			], [
				"video-player",
				["U/O", "跳过10秒向前/向后"],
				["P/K/Space", "播放/暂停"],
				["C", "继续播放下一段"],
				["V", "循环"],
				["M", "静音"],
				["[ and ]", "设置循环区间"]
			], [
				"textfile-viewer",
				["I/K", "前一个/下一个文件"],
				["M", "关闭文本文件"],
				["E", "编辑文本文件"],
				["S", "选择文件（用于剪切/重命名）"]
			]
		],

		"m_ok": "确定",
		"m_ng": "取消",

		"enable": "启用",
		"danger": "危险",
		"clipped": "已复制到剪贴板",

		"ht_s": "秒",
		"ht_m": "分",
		"ht_h": "时",
		"ht_d": "天",
		"ht_and": " 和 ",

		"goh": "控制面板",
		"gop": '前一项">pre',
		"gou": '顶部">up',
		"gon": '下一项">next',
		"logout": " 登出",
		"access": " 访问",
		"ot_close": "关闭子菜单",
		"ot_search": "按属性、路径/名称、音乐标签或上述内容的任意组合搜索文件$N$N&lt;code&gt;foo bar&lt;/code&gt; = 必须包含 «foo» 和 «bar»,$N&lt;code&gt;foo -bar&lt;/code&gt; = 包含 «foo» 而不包含 «bar»,$N&lt;code&gt;^yana .opus$&lt;/code&gt; = 以 «yama» 为开头的 «opus» 文件$N&lt;code&gt;&quot;try unite&quot;&lt;/code&gt; = 正好包含 «try unite»$N$N时间格式为 iso-8601, 比如:$N&lt;code&gt;2009-12-31&lt;/code&gt; or &lt;code&gt;2020-09-12 23:30:00&lt;/code&gt;",
		"ot_unpost": "取消发布：删除最近上传的内容，或中止未完成的内容",
		"ot_bup": "bup：基础上传器，甚至支持 Netscape 4.0",
		"ot_mkdir": "mkdir：创建新目录",
		"ot_md": "new-md：创建新 Markdown 文档",
		"ot_msg": "msg：向服务器日志发送消息",
		"ot_mp": "媒体播放器选项",
		"ot_cfg": "配置选项",
		"ot_u2i": 'up2k：上传文件（如果你有写入权限），或切换到搜索模式以查看文件是否存在于服务器上,$N$N上传是可恢复的，多线程的，保留文件时间戳，但比 [🎈]&nbsp;（基础上传器）占用 更多的CPU<br /><br />上传过程中，此图标会变成进度指示器！',
		"ot_u2w": 'up2k：带有恢复支持的文件上传（关闭浏览器后，重新上传相同文件）$N$N多线程的，文件时间戳得以保留，但比 [🎈]&nbsp; （基础上传器）使用更多CPU<br /><br />上传过程中，这个图标会变成进度指示器！',
		"ot_noie": '请使用 Chrome / Firefox / Edge',

		"ab_mkdir": "创建目录",
		"ab_mkdoc": "新建 Markdown 文档",
		"ab_msg": "发送消息到服务器日志",

		"ay_path": "跳转到文件夹",
		"ay_files": "跳转到文件",

		"wt_ren": "重命名选中的项目$N快捷键: F2",
		"wt_del": "删除选中的项目$N快捷键: ctrl-K",
		"wt_cut": "剪切选中的项目&lt;small&gt;（然后粘贴到其他地方）&lt;/small&gt;$N快捷键: ctrl-X",
		"wt_pst": "粘贴之前剪切/复制的选择$N快捷键: ctrl-V",
		"wt_selall": "选择所有文件$N快捷键: ctrl-A（当文件被聚焦时）",
		"wt_selinv": "反转选择",
		"wt_selzip": "将选择下载为归档文件",
		"wt_seldl": "将选择下载为单独的文件$N快捷键: Y",
		"wt_npirc": "复制 IRC 格式的曲目信息",
		"wt_nptxt": "复制纯文本格式的曲目信息",
		"wt_grid": "切换网格/列表视图$N快捷键: G",
		"wt_prev": "上一曲$N快捷键: J",
		"wt_play": "播放/暂停$N快捷键: P",
		"wt_next": "下一曲$N快捷键: L",

		"ul_par": "并行上传：",
		"ut_rand": "随机化文件名",
		"ut_u2ts": "将最后修改的时间戳$N从你的文件系统复制到服务器",
		"ut_mt": "在上传时继续哈希其他文件$N$N如果你的 CPU 或硬盘是瓶颈，可能需要禁用",
		"ut_ask": '上传开始前询问确认">💭',
		"ut_pot": "通过简化 UI 来$N提高慢设备上的上传速度",
		"ut_srch": "实际不上传，而是检查文件是否$N已经存在于服务器上（将扫描你可以读取的所有文件夹）",
		"ut_par": "通过将其设置为 0 来暂停上传$N$N如果你的连接很慢/延迟高，$N$N请增加在局域网或服务器硬盘是瓶颈时保持为 1",
		"ul_btn": "将文件/文件夹拖放到这里（或点击我）",
		"ul_btnu": "上 传",
		"ul_btns": "搜 索",

		"ul_hash": "哈希",
		"ul_send": "发送",
		"ul_done": "完成",
		"ul_idle1": "没有排队的上传任务",
		"ut_etah": "平均 &lt;em&gt;hashing&lt;/em&gt; 速度和估计完成时间",
		"ut_etau": "平均 &lt;em&gt;上传&lt;/em&gt; 速度和估计完成时间",
		"ut_etat": "平均 &lt;em&gt;总&lt;/em&gt; 速度和估计完成时间",

		"uct_ok": "成功完成",
		"uct_ng": "失败/拒绝/未找到",
		"uct_done": "成功和失败的组合",
		"uct_bz": "正在哈希或上传",
		"uct_q": "空闲，待处理",

		"utl_name": "文件名",
		"utl_ulist": "列表",
		"utl_ucopy": "复制",
		"utl_links": "链接",
		"utl_stat": "状态",
		"utl_prog": "进度",

		// 保持简短:
		"utl_404": "404",
		"utl_err": "错误",
		"utl_oserr": "OS错误",
		"utl_found": "已找到",
		"utl_defer": "延期",
		"utl_yolo": "加速",
		"utl_done": "完成",

		"ul_flagblk": "文件已添加到队列</b><br>但另一个浏览器标签中有一个繁忙的 up2k，<br>因此等待它完成",
		"ul_btnlk": "服务器配置已将此开关锁定到此状态",

		"udt_up": "上传",
		"udt_srch": "搜索",
		"udt_drop": "将文件拖放到这里",

		"u_nav_m": '<h6>好的，你有什么？</h6><code>Enter</code> = 文件（一个或多个）\n<code>ESC</code> = 一个文件夹（包括子文件夹）',
		"u_nav_b": '<a href="#" id="modal-ok">文件</a><a href="#" id="modal-ng">一个文件夹</a>',

		"cl_opts": "开关选项",
		"cl_themes": "主题",
		"cl_langs": "语言",
		"cl_ziptype": "文件夹下载",
		"cl_uopts": "up2k 开关",
		"cl_favico": "网站图标",
		"cl_bigdir": "最大目录数",
		"cl_keytype": "键位符号",
		"cl_hiddenc": "隐藏列",
		"cl_hidec": "隐藏",
		"cl_reset": "重置",
		"cl_hpick": "点击列标题以在下表中隐藏",
		"cl_hcancel": "列隐藏已取消",

		"ct_grid": '网格视图',
		"ct_ttips": '◔ ◡ ◔">ℹ️ 工具提示',
		"ct_thumb": '在网格视图中，切换图标或缩略图$N快捷键: T">🖼️ 缩略图',
		"ct_csel": '在网格视图中使用 CTRL 和 SHIFT 进行文件选择">CTRL',
		"ct_ihop": '当图像查看器关闭时，滚动到最后查看的文件">滚动',
		"ct_dots": '显示隐藏文件（如果服务器允许）">隐藏文件',
		"ct_dir1st": '在文件之前排序文件夹">📁 排序',
		"ct_readme": '在文件夹列表中显示 README.md">📜 readme',
		"ct_idxh": '显示 index.html 代替文件夹列表">htm',
		"ct_sbars": '显示滚动条">⟊',

		"cut_umod": "如果文件已存在于服务器上，将服务器的最后修改时间戳更新为与你的本地文件匹配（需要写入和删除权限）\">re📅",

		"cut_turbo": "YOLO 按钮，你可能不想启用这个：$N$N如果你上传了大量文件并且由于某些原因需要重新启动，$N并且想要尽快继续上传，使用此选项$N$N这会用简单的 <em>&quot;服务器上的文件大小是否相同？&quot;</em> 替代哈希检查，$N因此如果文件内容不同，它将不会被上传$N$N上传完成后，你应该关闭此选项，$N然后重新&quot;上传&quot;相同的文件以让客户端验证它们\">加速",

		"cut_datechk": "除非启用「加速」按钮，否则没有效果$N$N略微减少 YOLO 因素；检查服务器上的文件时间戳是否与你的一致$N$N<em>理论上</em> 应该能捕捉到大多数未完成/损坏的上传，$N但不能替代之后禁用「加速」进行的验证\">日期检查",

		"cut_u2sz": "每个上传块的大小（以 MiB 为单位）；较大的值跨大西洋传输效果更好。在非常不可靠的连接上尝试较小的值",

		"cut_flag": "确保一次只有一个标签页在上传$N -- 其他标签页也必须启用此选项$N -- 仅影响同一域名下的标签页",

		"cut_az": "按字母顺序上传文件，而不是按最小文件优先$N$N按字母顺序可以更容易地查看服务器上是否出现了问题，但在光纤/局域网上传稍微慢一些",

		"cut_nag": "上传完成时的操作系统通知$N（仅当浏览器或标签页不活跃时）",
		"cut_sfx": "上传完成时的声音警报$N（仅当浏览器或标签页不活跃时）",

		"cut_mt": "使用多线程加速文件哈希$N$N这使用 Web Worker 并且需要更多内存（额外最多 512 MiB）$N$N比https快30%，http快4.5倍，比Android 手机快5.3倍\">mt",

		"cft_text": "网站图标文本（为空并刷新以禁用）",
		"cft_fg": "前景色",
		"cft_bg": "背景色",

		"cdt_lim": "文件夹中显示的最大文件数",
		"cdt_ask": "滚动到底部时，$N不会加载更多文件，$N而是询问你该怎么做",

		"tt_entree": "显示导航面板（目录树侧边栏）$N快捷键: B",
		"tt_detree": "显示面包屑导航$N快捷键: B",
		"tt_visdir": "滚动到选定的文件夹",
		"tt_ftree": "切换文件夹树 / 文本文件$N快捷键: V",
		"tt_pdock": "在顶部的停靠窗格中显示父文件夹",
		"tt_dynt": "随着树的展开自动增长",
		"tt_wrap": "自动换行",
		"tt_hover": "悬停时显示溢出的行$N（当鼠标光标在左侧边栏中时，滚动可能会中断）",

		"ml_pmode": "在文件夹末尾时...",
		"ml_btns": "命令",
		"ml_tcode": "转码",
		"ml_tint": "透明度",
		"ml_eq": "音频均衡器",
		"ml_drc": "动态范围压缩器",

		"mt_shuf": "在每个文件夹中随机播放歌曲\">🔀",
		"mt_aplay": "如果链接中有歌曲 ID，则自动播放,禁用此选项将停止在播放音乐时更新页面 URL 中的歌曲 ID，以防止在设置丢失但 URL 保留时自动播放\">自动播放▶",
		"mt_preload": "在歌曲快结束时开始加载下一首歌，以实现无缝播放\">预加载",
		"mt_prescan": "在最后一首歌结束之前切换到下一个文件夹$N保持网页浏览器活跃$N以免停止播放\">自动切换",
		"mt_fullpre": "尝试预加载整首歌；$N✅ 在 <b>不可靠</b> 连接上启用，$N❌ 可能在慢速连接上禁用\">加载整首歌",
		"mt_fau": "在手机上，如果下一首歌未能快速预加载，防止音乐停止（可能导致标签显示异常）\">☕️",
		"mt_waves": "波形进度条：$N显示音频幅度\">进度条",
		"mt_npclip": "显示当前播放歌曲的剪贴板按钮\">♪剪切板",
		"mt_octl": "操作系统集成（媒体快捷键 / OSD）\">OSD",
		"mt_oseek": "允许通过操作系统集成进行跳转$N$N注意：在某些设备（如 iPhone）上，$N这将替代下一首歌按钮\">seek",
		"mt_oscv": "在 OSD 中显示专辑封面\">封面",
		"mt_follow": "保持正在播放的曲目滚动到视图中\">🎯",
		"mt_compact": "紧凑的控制按钮\">⟎",
		"mt_uncache": "清除缓存&nbsp;$N（如果你的浏览器缓存了一个损坏的歌曲副本而拒绝播放，请尝试此操作）\">uncache",
		"mt_mloop": "循环打开的文件夹\">🔁 循环",
		"mt_mnext": "加载下一个文件夹并继续\">📂 下一首",
		"mt_cflac": "将 flac / wav 转换为 opus\">flac",
		"mt_caac": "将 aac / m4a 转换为 opus\">aac",
		"mt_coth": "将所有其他（不是 mp3）转换为 opus\">oth",
		"mt_tint": "在进度条上设置背景级别（0-100）",
		"mt_eq": "启用均衡器和增益控制；$N$Nboost &lt;code&gt;0&lt;/code&gt; = 标准 100% 音量（默认）$N$Nwidth &lt;code&gt;1 &nbsp;&lt;/code&gt; = 标准立体声（默认）$Nwidth &lt;code&gt;0.5&lt;/code&gt; = 50% 左右交叉反馈$Nwidth &lt;code&gt;0 &nbsp;&lt;/code&gt; = 单声道$N$Nboost &lt;code&gt;-0.8&lt;/code&gt; &amp; width &lt;code&gt;10&lt;/code&gt; = 人声移除 )$N$N启用均衡器使无缝专辑完全无缝，所以如果你在乎这一点，请保持启用，所有值设为零（除了宽度 = 1）",
		"mt_drc": "启用动态范围压缩器（音量平滑器 / 限幅器）；还会启用均衡器以平衡音频，因此如果你不想要它，请将均衡器字段除了 '宽度' 外的所有字段设置为 0$N$N降低 THRESHOLD dB 以上的音频的音量；每超过 THRESHOLD dB 的 RATIO 会有 1 dB 输出，所以默认值 tresh -24 和 ratio 12 意味着它的音量不应超过 -22 dB，可以安全地将均衡器增益提高到 0.8，甚至在 ATK 0 和 RLS 如 90 的情况下提高到 1.8（仅在 Firefox 中有效；其他浏览器中 RLS 最大为 1）$N$N（见维基百科，他们解释得更好）",

		"mb_play": "播放",
		"mm_hashplay": "播放这个音频文件？",
		"mp_breq": "需要 Firefox 82+ 或 Chrome 73+ 或 iOS 15+",
		"mm_bload": "正在加载...",
		"mm_bconv": "正在转换为 {0}，请稍等...",
		"mm_opusen": "你的浏览器无法播放 aac / m4a 文件；\n现在启用转码为 opus",
		"mm_playerr": "播放失败：",
		"mm_eabrt": "播放尝试已取消",
		"mm_enet": "你的互联网连接有问题",
		"mm_edec": "这个文件可能已损坏？？",
		"mm_esupp": "你的浏览器不支持这个音频格式",
		"mm_eunk": "未知错误",
		"mm_e404": "无法播放音频；错误 404：文件未找到。",
		"mm_e403": "无法播放音频；错误 403：访问被拒绝。\n\n尝试按 F5 重新加载，也许你已被注销",
		"mm_e5xx": "无法播放音频；服务器错误",
		"mm_nof": "附近找不到更多音频文件",
		"mm_prescan": "正在寻找下一首音乐...",
		"mm_scank": "找到下一首歌：",
		"mm_uncache": "缓存已清除；所有歌曲将在下次播放时重新下载",
		"mm_hnf": "那首歌不再存在",

		"im_hnf": "那张图片不再存在",

		"f_empty": '该文件夹为空',
		"f_chide": '隐藏列 «{0}»\n\n你可以在设置选项卡中重新显示列',
		"f_bigtxt": "这个文件大小为 {0} MiB -- 真的以文本形式查看？",
		"fbd_more": '<div id="blazy">显示 <code>{0}</code> 个文件中的 <code>{1}</code> 个；<a href="#" id="bd_more">显示 {2}</a> 或 <a href="#" id="bd_all">显示全部</a></div>',
		"fbd_all": '<div id="blazy">显示 <code>{0}</code> 个文件中的 <code>{1}</code> 个；<a href="#" id="bd_all">显示全部</a></div>',

		"f_dls": '当前文件夹中的文件链接已\n更改为下载链接',

		"f_partial": "要安全下载正在上传的文件，请点击没有 <code>.PARTIAL</code> 文件扩展名的同名文件。请按取消或 Escape 执行此操作。\n\n按 OK / Enter 将忽略此警告并继续下载 <code>.PARTIAL</code> 临时文件，这几乎肯定会导致数据损坏。",

		"ft_paste": "粘贴 {0} 项$N快捷键: ctrl-V",
		"fr_eperm": '无法重命名：\n你在此文件夹中没有 “移动” 权限',
		"fd_eperm": '无法删除：\n你在此文件夹中没有 “删除” 权限',
		"fc_eperm": '无法剪切：\n你在此文件夹中没有 “移动” 权限',
		"fp_eperm": '无法粘贴：\n你在此文件夹中没有 “写入” 权限',
		"fr_emore": "选择至少一个项目以重命名",
		"fd_emore": "选择至少一个项目以删除",
		"fc_emore": "选择至少一个项目以剪切",

		"fs_sc": "分享你所在的文件夹",
		"fs_ss": "分享选定的文件",
		"fs_just1d": "你不能同时选择多个文件夹，也不能同时选择文件夹和文件",
		"fs_abrt": "❌ 取消",
		"fs_rand": "🎲 随机名称",
		"fs_go": "✅ 创建分享",
		"fs_name": "名称",
		"fs_src": "源",
		"fs_pwd": "密码",
		"fs_exp": "过期",
		"fs_tmin": "分",
		"fs_thrs": "时",
		"fs_tdays": "天",
		"fs_never": "永久",
		"fs_pname": "链接名称可选；如果为空则随机",
		"fs_tsrc": "共享的文件或文件夹",
		"fs_ppwd": "密码可选",
		"fs_w8": "正在创建文件共享...",
		"fs_ok": "<h6>分享链接已创建</h6>\n按 <code>Enter/OK</code> 复制到剪贴板\n按 <code>ESC/Cancel</code> 关闭\n\n",

		"frt_dec": "可能修复一些损坏的文件名\">url-decode",
		"frt_rst": "将修改后的文件名重置为原始文件名\">↺ 重置",
		"frt_abrt": "中止并关闭此窗口\">❌ 取消",
		"frb_apply": "应用重命名",
		"fr_adv": "批量 / 元数据 / 模式重命名\">高级",
		"fr_case": "区分大小写的正则表达式\">case",
		"fr_win": "Windows 安全名称；将 <code>&lt;&gt;:&quot;\\|?*</code> 替换为日文全角字符\">win",
		"fr_slash": "将 <code>/</code> 替换为不会导致新文件夹创建的字符\">不使用 /",
		"fr_re": "正则表达式搜索模式应用于原始文件名；$N可以在下面的格式字段中引用捕获组，如&lt;code&gt;(1)&lt;/code&gt;和&lt;code&gt;(2)&lt;/code&gt;等等。",
		"fr_fmt": "受到 foobar2000 的启发：$N&lt;code&gt;(title)&lt;/code&gt; 被歌曲名称替换,$N&lt;code&gt;[(artist) - ](title)&lt;/code&gt; 仅当歌曲艺术家不为空时才包含&lt;code&gt;[此]&lt;/code&gt;部分$N&lt;code&gt;$lpad((tn),2,0)&lt;/code&gt; 将曲目编号填充为 2 位数字",
		"fr_pdel": "删除",
		"fr_pnew": "另存为",
		"fr_pname": "为你的新预设提供一个名称",
		"fr_aborted": "已中止",
		"fr_lold": "旧名称",
		"fr_lnew": "新名称",
		"fr_tags": "选定文件的标签（只读，仅供参考）：",
		"fr_busy": "正在重命名 {0} 项...\n\n{1}",
		"fr_efail": "重命名失败：\n",
		"fr_nchg": "{0} 个新名称由于 <code>win</code> 和/或 <code>不使用 /</code> 被更改\n\n确定继续使用这些更改的新名称？",

		"fd_ok": "删除成功",
		"fd_err": "删除失败：\n",
		"fd_none": "没有文件被删除；可能被服务器配置（xbd）阻止？",
		"fd_busy": "正在删除 {0} 项...\n\n{1}",
		"fd_warn1": "删除这 {0} 项？",
		"fd_warn2": "<b>最后机会！</b> 无法撤销。删除？",

		"fc_ok": "剪切 {0} 项",
		"fc_warn": '剪切 {0} 项\n\n但：只有 <b>这个</b> 浏览器标签页可以粘贴它们\n（因为选择非常庞大）',

		"fp_ecut": "首先剪切一些文件/文件夹以粘贴/移动\n\n注意：你可以在不同的浏览器标签页之间剪切/粘贴",
		"fp_ename": "这些 {0} 项不能移动到这里（名称已存在）：",
		"fp_ok": "移动成功",
		"fp_busy": "正在移动 {0} 项...\n\n{1}",
		"fp_err": "移动失败：\n",
		"fp_confirm": "将这些 {0} 项移动到这里？",
		"fp_etab": '无法从其他浏览器标签页读取剪贴板',
		"fp_name": "从你的设备上传一个文件。给它一个名字：",
		"fp_both_m": '<h6>选择粘贴内容</h6><code>Enter</code> = 从 «{1}» 移动 {0} 个文件\n<code>ESC</code> = 从你的设备上传 {2} 个文件',
		"fp_both_b": '<a href="#" id="modal-ok">移动</a><a href="#" id="modal-ng">上传</a>',

		"mk_noname": "在左侧文本框中输入名称，然后再执行此操作 :p",

		"tv_load": "加载文本文件：\n\n{0}\n\n{1}% ({2} 的 {3} MiB 已加载)",
		"tv_xe1": "无法加载文本文件：\n\n错误 ",
		"tv_xe2": "404，文件未找到",
		"tv_lst": "文本文件列表",
		"tvt_close": "返回到文件夹视图$N快捷键: M（或 Esc）\">❌ 关闭",
		"tvt_dl": "下载此文件$N快捷键: Y\">💾 下载",
		"tvt_prev": "显示上一个文档$N快捷键: i\">⬆ 上一个",
		"tvt_next": "显示下一个文档$N快捷键: K\">⬇ 下一个",
		"tvt_sel": "选择文件&nbsp;（用于剪切/删除/...）$N快捷键: S\">选择",
		"tvt_edit": "在文本编辑器中打开文件$N快捷键: E\">✏️ 编辑",

		"gt_vau": "不显示视频，仅播放音频\">🎧",
		"gt_msel": "启用文件选择；按住 ctrl 键点击文件以覆盖$N$N&lt;em&gt;当启用时：双击文件/文件夹以打开它&lt;/em&gt;$N$N快捷键：S\">多选",
		"gt_crop": "中心裁剪缩略图\">裁剪",
		"gt_3x": "高分辨率缩略图\">3x",
		"gt_zoom": "缩放",
		"gt_chop": "剪裁",
		"gt_sort": "排序依据",
		"gt_name": "名称",
		"gt_sz": "大小",
		"gt_ts": "日期",
		"gt_ext": "类型",
		"gt_c1": "截断文件名更多（显示更少）",
		"gt_c2": "截断文件名更少（显示更多）",

		"sm_w8": "正在搜索...",
		"sm_prev": "上次查询的搜索结果：\n  ",
		"sl_close": "关闭搜索结果",
		"sl_hits": "显示 {0} 个结果",
		"sl_moar": "加载更多",

		"s_sz": "大小",
		"s_dt": "日期",
		"s_rd": "路径",
		"s_fn": "名称",
		"s_ta": "标签",
		"s_ua": "上传于",
		"s_ad": "高级",
		"s_s1": "最小 MiB",
		"s_s2": "最大 MiB",
		"s_d1": "最早 iso8601",
		"s_d2": "最晚 iso8601",
		"s_u1": "上传后",
		"s_u2": "和/或之前",
		"s_r1": "路径包含 &nbsp;（空格分隔）",
		"s_f1": "名称包含 &nbsp;（用 -nope 否定）",
		"s_t1": "标签包含 &nbsp;（^=开头，$=结尾）",
		"s_a1": "特定元数据属性",

		"md_eshow": "无法渲染 ",
		"md_off": "[📜<em>readme</em>] 在 [⚙️] 中禁用 -- 文档隐藏",

		"badreply": "解析服务器回复失败",

		"xhr403": "403: 访问被拒绝\n\n尝试按 F5 可能会重新登录",
		"xhr0": "未知（可能丢失连接到服务器，或服务器离线）",
		"cf_ok": "抱歉 -- DD" + wah + "oS 保护启动\n\n事情应该在大约 30 秒后恢复\n\n如果没有任何变化，按 F5 重新加载页面",
		"tl_xe1": "无法列出子文件夹：\n\n错误 ",
		"tl_xe2": "404: 文件夹未找到",
		"fl_xe1": "无法列出文件夹中的文件：\n\n错误 ",
		"fl_xe2": "404: 文件夹未找到",
		"fd_xe1": "无法创建子文件夹：\n\n错误 ",
		"fd_xe2": "404: 父文件夹未找到",
		"fsm_xe1": "无法发送消息：\n\n错误 ",
		"fsm_xe2": "404: 父文件夹未找到",
		"fu_xe1": "无法从服务器加载未发布列表：\n\n错误 ",
		"fu_xe2": "404: 文件未找到??",

		"fz_tar": "未压缩的 gnu-tar 文件（linux / mac）",
		"fz_pax": "未压缩的 pax 格式 tar（较慢）",
		"fz_targz": "gnu-tar 带 gzip 级别 3 压缩$N$N通常非常慢，所以$N建议使用未压缩的 tar",
		"fz_tarxz": "gnu-tar 带 xz 级别 1 压缩$N$N通常非常慢，所以$N建议使用未压缩的 tar",
		"fz_zip8": "zip 带 utf8 文件名（在 windows 7 及更早版本上可能会出现问题）",
		"fz_zipd": "zip 带传统 cp437 文件名，适用于非常旧的软件",
		"fz_zipc": "cp437 带 crc32 提前计算，$N适用于 MS-DOS PKZIP v2.04g（1993 年 10 月）$N（处理时间较长，在下载开始之前）",

		"un_m1": "你可以删除下面的近期上传（或中止未完成的上传）",
		"un_upd": "刷新",
		"un_m4": "或分享下面可见的文件：",
		"un_ulist": "显示",
		"un_ucopy": "复制",
		"un_flt": "可选过滤器：&nbsp; URL 必须包含",
		"un_fclr": "清除过滤器",
		"un_derr": '未发布删除失败：\n',
		"un_f5": '出现问题，请尝试刷新或按 F5',
		"un_uf5": "抱歉，你必须刷新页面（例如，按 F5 或 CTRL-R），然后才能中止此上传",
		"un_nou": '<b>警告：</b> 服务器太忙，无法显示未完成的上传；稍后点击“刷新”链接',
		"un_noc": '<b>警告：</b> 服务器配置中未启用/允许完全上传文件的取消发布',
		"un_max": "显示前 2000 个文件（使用过滤器）",
		"un_avail": "{0} 个近期上传可以被删除<br />{1} 个未完成的上传可以被中止",
		"un_m2": "按上传时间排序；最新的在前：",
		"un_no1": "哎呀！没有足够新的上传",
		"un_no2": "哎呀！没有符合该过滤器的足够新的上传",
		"un_next": "删除下面的下一个 {0} 个文件",
		"un_abrt": "中止",
		"un_del": "删除",
		"un_m3": "正在加载你的近期上传...",
		"un_busy": "正在删除 {0} 个文件...",
		"un_clip": "{0} 个链接已复制到剪贴板",

		"u_https1": "你应该",
		"u_https2": "切换到 https",
		"u_https3": "以获得更好的性能",
		"u_ancient": '你的浏览器非常古老 -- 也许你应该 <a href="#" onclick="goto(\'bup\')">改用 bup</a>',
		"u_nowork": "需要 Firefox 53+ 或 Chrome 57+ 或 iOS 11+",
		"u_nodrop": '浏览器版本低，不支持通过拖动文件到窗口来上传文件',
		"u_notdir": "不是文件夹！\n\n您的浏览器太旧；\n请尝试将文件夹拖入窗口",
		"u_uri": "要从其他浏览器窗口拖放图片，\n请将其拖放到大的上传按钮上",
		"u_enpot": '切换到 <a href="#">简约 UI</a>（可能提高上传速度）',
		"u_depot": '切换到 <a href="#">精美 UI</a>（可能降低上传速度）',
		"u_gotpot": '切换到简化UI以提高上传速度，\n\n随时可以不同意并切换回去！',
		"u_pott": "<p>个文件： &nbsp; <b>{0}</b> 已完成， &nbsp; <b>{1}</b> 失败， &nbsp; <b>{2}</b> 正在处理， &nbsp; <b>{3}</b> 排队中</p>",
		"u_ever": "这是基本的上传工具； up2k 需要至少<br>chrome 21 // firefox 13 // edge 12 // opera 12 // safari 5.1",
		"u_su2k": '这是基本的上传工具；<a href="#" id="u2yea">up2k</a> 更好',
		"u_ewrite": '你对这个文件夹没有写入权限',
		"u_eread": '你对这个文件夹没有读取权限',
		"u_enoi": '文件搜索在服务器配置中未启用',
		"u_badf": '这些 {0} 个文件（共 {1} 个）被跳过，可能是由于文件系统权限：\n\n',
		"u_blankf": '这些 {0} 个文件（共 {1} 个）是空白的；是否仍然上传？\n\n',
		"u_just1": '\n也许如果你只选择一个文件会更好',
		"u_ff_many": "如果你使用的是 <b>Linux / MacOS / Android，</b> 那么这个文件数量 <a href=\"https://bugzilla.mozilla.org/show_bug.cgi?id=1790500\" target=\"_blank\"><em>可能</em> 崩溃 Firefox!</a>\n如果发生这种情况，请再试一次（或使用 Chrome）。",
		"u_up_life": "此上传将在 {0} 后从服务器删除",
		"u_asku": '将这些 {0} 个文件上传到 <code>{1}</code>',
		"u_unpt": "你可以使用左上角的 🧯 撤销/删除此上传",
		"u_bigtab": '将显示 {0} 个文件,可能会导致您的浏览器崩溃。您确定吗？',
		"u_scan": '正在扫描文件...',
		"u_dirstuck": '您的浏览器无法访问以下 {0} 个文件/文件夹，它们将被跳过：',
		"u_etadone": '完成 ({0}, {1} 个文件)',
		"u_etaprep": '(准备上传)',
		"u_hashdone": '哈希完成',
		"u_hashing": '哈希',
		"u_hs": '正在等待服务器...',
		"u_dupdefer": "这是一个重复文件。它将在所有其他文件上传后进行处理",
		"u_actx": "单击此文本以防止切换到其他窗口/选项卡时性能下降",
		"u_fixed": "好！&nbsp;已修复 👍",
		"u_cuerr": "上传块 {0} 的 {1} 失败；\n可能无害，继续中\n\n文件：{2}",
		"u_cuerr2": "服务器拒绝上传（块 {0} 的 {1}）；\n稍后重试\n\n文件：{2}\n\n错误 ",
		"u_ehstmp": "将重试；见右下角",
		"u_ehsfin": "服务器拒绝了最终上传请求；正在重试...",
		"u_ehssrch": "服务器拒绝了搜索请求；正在重试...",
		"u_ehsinit": "服务器拒绝了启动上传请求；正在重试...",
		"u_eneths": "进行上传握手时的网络错误；正在重试...",
		"u_enethd": "测试目标存在时的网络错误；正在重试...",
		"u_cbusy": "等待服务器在网络故障后再次信任我们...",
		"u_ehsdf": "服务器磁盘空间不足！\n\n将继续重试，以防有人\n释放足够的空间以继续",
		"u_emtleak1": "看起来你的网页浏览器可能有内存泄漏；\n请",
		"u_emtleak2": ' <a href="{0}">切换到 https（推荐）</a> 或 ',
		"u_emtleak3": ' ',
		"u_emtleakc": '尝试以下操作：\n<ul><li>按 <code>F5</code> 刷新页面</li><li>然后在&nbsp;<code>⚙️ 设置</code> 中禁用&nbsp;<code>mt</code>&nbsp;按钮</li><li>然后再次尝试上传</li></ul>上传会稍微慢一些，不过没关系。\n抱歉带来麻烦！\n\nPS：chrome v107 <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1354816" target="_blank">已修复</a>此问题',
		"u_emtleakf": '尝试以下操作：\n<ul><li>按 <code>F5</code> 刷新页面</li><li>然后在上传 UI 中启用 <code>🥔</code>（土豆）<li>然后再次尝试上传</li></ul>\nPS: firefox <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1790500" target="_blank">希望会在某个时点修复此问题</a>',
		"u_s404": "在服务器上未找到",
		"u_expl": "解释",
		"u_maxconn": "大多数浏览器限制为 6，但 Firefox 允许你通过 <code>connections-per-server</code> 在 <code>about:config</code> 中提高限制",
		"u_tu": '<p class="warn">警告：启用了 turbo，<span>&nbsp;客户端可能无法检测和恢复不完整的上传；查看 turbo 按钮工具提示</span></p>',
		"u_ts": '<p class="warn">警告：启用了 turbo，<span>&nbsp;搜索结果可能不正确；查看 turbo 按钮工具提示</span></p>',
		"u_turbo_c": "服务器配置中禁用了 turbo",
		"u_turbo_g": "禁用 turbo，因为你在此卷中没有\n目录列表权限",
		"u_life_cfg": '自动删除时间为 <input id="lifem" p="60" /> 分钟（或 <input id="lifeh" p="3600" /> 小时）',
		"u_life_est": '上传将在 <span id="lifew" tt="本地时间">---</span> 删除',
		"u_life_max": '此文件夹强制执行\n最大寿命为 {0}',
		"u_unp_ok": '允许取消发布 {0}',
		"u_unp_ng": '取消发布将不被允许',
		"ue_ro": '你对这个文件夹的访问是只读的\n\n',
		"ue_nl": '你当前未登录',
		"ue_la": '你当前以 "{0}" 登录',
		"ue_sr": '你当前处于文件搜索模式\n\n通过点击大搜索按钮旁边的放大镜 🔎 切换到上传模式，然后重试上传\n\n抱歉',
		"ue_ta": '尝试再次上传，现在应该能正常工作',
		"ur_1uo": "成功：文件上传成功",
		"ur_auo": "成功：所有 {0} 个文件上传成功",
		"ur_1so": "成功：文件在服务器上找到",
		"ur_aso": "成功：所有 {0} 个文件在服务器上找到",
		"ur_1un": "上传失败，抱歉",
		"ur_aun": "所有 {0} 个上传失败，抱歉",
		"ur_1sn": "文件未在服务器上找到",
		"ur_asn": "这些 {0} 个文件未在服务器上找到",
		"ur_um": "完成；\n{0} 个上传成功，\n{1} 个上传失败，抱歉",
		"ur_sm": "完成；\n{0} 个文件在服务器上找到，\n{1} 个文件未在服务器上找到",

		"lang_set": "刷新以使更改生效？",
	},
};

var LANGS = ["eng", "nor", "chi"];

if (window.langmod)
	langmod();

for (var a = LANGS.length; a > 0;)
	if (!Ls[LANGS[--a]])
		LANGS.splice(a, 1);

var L = Ls[sread("cpp_lang", LANGS) || lang] ||
			Ls.eng || Ls.nor || Ls.chi;

for (var a = 0; a < LANGS.length; a++) {
	for (var b = a + 1; b < LANGS.length; b++) {
		var i1 = Object.keys(Ls[LANGS[a]]).length > Object.keys(Ls[LANGS[b]]).length ? a : b,
			i2 = i1 == a ? b : a,
			t1 = Ls[LANGS[i1]],
			t2 = Ls[LANGS[i2]];

		for (var k in t1)
			if (!t2[k]) {
				console.log("E missing TL", LANGS[i2], k);
				t2[k] = t1[k];
			}
	}
}

if (!has(LANGS, lang))
	alert('unsupported --lang "' + lang + '" specified in server args;\nplease use one of these: ' + LANGS);

modal.load();


// toolbar
ebi('ops').innerHTML = (
	'<a href="#" id="opa_x" data-dest="" tt="' + L.ot_close + '">--</a>' +
	'<a href="#" id="opa_srch" data-perm="read" data-dep="idx" data-dest="search" tt="' + L.ot_search + '">🔎</a>' +
	(have_del ? '<a href="#" id="opa_del" data-dest="unpost" tt="' + L.ot_unpost + '">🧯</a>' : '') +
	'<a href="#" id="opa_up" data-dest="up2k">🚀</a>' +
	'<a href="#" id="opa_bup" data-perm="write" data-dest="bup" tt="' + L.ot_bup + '">🎈</a>' +
	'<a href="#" id="opa_mkd" data-perm="write" data-dest="mkdir" tt="' + L.ot_mkdir + '">📂</a>' +
	'<a href="#" id="opa_md" data-perm="read write" data-dest="new_md" tt="' + L.ot_md + '">📝</a>' +
	'<a href="#" id="opa_msg" data-dest="msg" tt="' + L.ot_msg + '">📟</a>' +
	'<a href="#" id="opa_auc" data-dest="player" tt="' + L.ot_mp + '">🎺</a>' +
	'<a href="#" id="opa_cfg" data-dest="cfg" tt="' + L.ot_cfg + '">⚙️</a>' +
	(IE ? '<span id="noie">' + L.ot_noie + '</span>' : '') +
	'<div id="opdesc"></div>'
);


// media player
ebi('widget').innerHTML = (
	'<div id="wtoggle">' +
	'<span id="wfs"></span>' +
	'<span id="wfm"><a' +
	' href="#" id="fshr" tt="' + L.wt_shr + '">📨<span>share</span></a><a' +
	' href="#" id="fren" tt="' + L.wt_ren + '">✎<span>name</span></a><a' +
	' href="#" id="fdel" tt="' + L.wt_del + '">⌫<span>del.</span></a><a' +
	' href="#" id="fcut" tt="' + L.wt_cut + '">✂<span>cut</span></a><a' +
	' href="#" id="fpst" tt="' + L.wt_pst + '">📋<span>paste</span></a>' +
	'</span><span id="wzip"><a' +
	' href="#" id="selall" tt="' + L.wt_selall + '">sel.<br />all</a><a' +
	' href="#" id="selinv" tt="' + L.wt_selinv + '">sel.<br />inv.</a><a' +
	' href="#" id="selzip" class="l1" tt="' + L.wt_selzip + '">zip</a><a' +
	' href="#" id="seldl" class="l1" tt="' + L.wt_seldl + '">dl</a>' +
	'</span><span id="wnp"><a' +
	' href="#" id="npirc" tt="' + L.wt_npirc + '">📋<span>irc</span></a><a' +
	' href="#" id="nptxt" tt="' + L.wt_nptxt + '">📋<span>txt</span></a>' +
	'</span><a' +
	'	href="#" id="wtgrid" tt="' + L.wt_grid + '">田</a><a' +
	'	href="#" id="wtico">♫</a>' +
	'</div>' +
	'<div id="widgeti">' +
	'	<div id="pctl"><a href="#" id="bprev" tt="' + L.wt_prev + '">⏮</a><a href="#" id="bplay" tt="' + L.wt_play + '">▶</a><a href="#" id="bnext" tt="' + L.wt_next + '">⏭</a></div>' +
	'	<canvas id="pvol" width="288" height="38"></canvas>' +
	'	<canvas id="barpos"></canvas>' +
	'	<canvas id="barbuf"></canvas>' +
	'</div>' +
	'<div id="np_inf">' +
	'	<img id="np_img"></span>' +
	'	<span id="np_url"></span>' +
	'	<span id="np_circle"></span>' +
	'	<span id="np_album"></span>' +
	'	<span id="np_tn"></span>' +
	'	<span id="np_artist"></span>' +
	'	<span id="np_title"></span>' +
	'	<span id="np_pos"></span>' +
	'	<span id="np_dur"></span>' +
	'</div>'
);


// up2k ui
ebi('op_up2k').innerHTML = (
	'<form id="u2form" method="post" enctype="multipart/form-data" onsubmit="return false;"></form>\n' +

	'<table id="u2conf">\n' +
	'	<tr>\n' +
	'		<td class="c" data-perm="read"><br />' + L.ul_par + '</td>\n' +
	'		<td class="c" rowspan="2">\n' +
	'			<input type="checkbox" id="multitask" />\n' +
	'			<label for="multitask" tt="' + L.ut_mt + '">🏃</label>\n' +
	'		</td>\n' +
	'		<td class="c" rowspan="2">\n' +
	'			<input type="checkbox" id="potato" />\n' +
	'			<label for="potato" tt="' + L.ut_pot + '">🥔</label>\n' +
	'		</td>\n' +
	'		<td class="c" rowspan="2">\n' +
	'			<input type="checkbox" id="u2rand" />\n' +
	'			<label for="u2rand" tt="' + L.ut_rand + '">🎲</label>\n' +
	'		</td>\n' +
	'		<td class="c" rowspan="2">\n' +
	'			<input type="checkbox" id="u2ts" />\n' +
	'			<label for="u2ts" tt="' + L.ut_u2ts + '">📅</a>\n' +
	'		</td>\n' +
	'		<td class="c" data-perm="read" data-dep="idx" rowspan="2">\n' +
	'			<input type="checkbox" id="fsearch" />\n' +
	'			<label for="fsearch" tt="' + L.ut_srch + '">🔎</label>\n' +
	'		</td>\n' +
	'		<td data-perm="read" rowspan="2" id="u2btn_cw"></td>\n' +
	'		<td data-perm="read" rowspan="2" id="u2c3w"></td>\n' +
	'	</tr>\n' +
	'	<tr>\n' +
	'		<td class="c" data-perm="read">\n' +
	'			<a href="#" class="b" id="nthread_sub">&ndash;</a><input\n' +
	'				class="txtbox" id="nthread" value="" tt="' + L.ut_par + '"/><a\n' +
	'				href="#" class="b" id="nthread_add">+</a><br />&nbsp;\n' +
	'		</td>\n' +
	'	</tr>\n' +
	'</table>\n' +

	'<div id="u2notbtn"></div>\n' +

	'<div id="u2btn_ct">\n' +
	'	<div id="u2btn" tabindex="0">\n' +
	'		<span id="u2bm"></span>\n' + L.ul_btn +
	'	</div>\n' +
	'</div>\n' +

	'<div id="u2c3t">\n' +

	'<div id="u2etaw"><div id="u2etas"><div class="o">\n' +
	L.ul_hash + ': <span id="u2etah" tt="' + L.ut_etah + '">(' + L.ul_idle1 + ')</span><br />\n' +
	L.ul_send + ': <span id="u2etau" tt="' + L.ut_etau + '">(' + L.ul_idle1 + ')</span><br />\n' +
	'	</div><span class="o">' +
	L.ul_done + ': </span><span id="u2etat" tt="' + L.ut_etat + '">(' + L.ul_idle1 + ')</span>\n' +
	'</div></div>\n' +

	'<div id="u2cards">\n' +
	'	<a href="#" act="ok" tt="' + L.uct_ok + '">ok <span>0</span></a><a\n' +
	'	href="#" act="ng" tt="' + L.uct_ng + '">ng <span>0</span></a><a\n' +
	'	href="#" act="done" tt="' + L.uct_done + '">done <span>0</span></a><a\n' +
	'	href="#" act="bz" tt="' + L.uct_bz + '" class="act">busy <span>0</span></a><a\n' +
	'	href="#" act="q" tt="' + L.uct_q + '">que <span>0</span></a>\n' +
	'</div>\n' +

	'</div>\n' +

	'<div id="u2tabw" class="na"><table id="u2tab">\n' +
	'	<thead>\n' +
	'		<tr>\n' +
	'			<td>' + L.utl_name + ' &nbsp;(<a href="#" id="luplinks">' + L.utl_ulist + '</a>/<a href="#" id="cuplinks">' + L.utl_ucopy + '</a>' + L.utl_links + ')</td>\n' +
	'			<td>' + L.utl_stat + '</td>\n' +
	'			<td>' + L.utl_prog + '</td>\n' +
	'		</tr>\n' +
	'	</thead>\n' +
	'	<tbody></tbody>\n' +
	'</table><div id="u2mu"></div></div>\n' +

	'<p id="u2flagblock"><b>' + L.ul_flagblk + '</p>\n' +
	'<div id="u2life"></div>' +
	'<div id="u2foot"></div>'
);


ebi('wrap').insertBefore(mknod('div', 'lazy'), ebi('epi'));


(function () {
	var o = mknod('div');
	o.innerHTML = (
		'<div id="drops">\n' +
		'	<div class="dropdesc" id="up_zd"><div>🚀 ' + L.udt_up + '<br /><span></span><div>🚀<b>' + L.udt_up + '</b></div><div><b>' + L.udt_up + '</b>🚀</div></div></div>\n' +
		'	<div class="dropdesc" id="srch_zd"><div>🔎 ' + L.udt_srch + '<br /><span></span><div>🔎<b>' + L.udt_srch + '</b></div><div><b>' + L.udt_srch + '</b>🔎</div></div></div>\n' +
		'	<div class="dropzone" id="up_dz" v="up_zd"></div>\n' +
		'	<div class="dropzone" id="srch_dz" v="srch_zd"></div>\n' +
		'</div>'
	);
	document.body.appendChild(o);
})();


// config panel
ebi('op_cfg').innerHTML = (
	'<div>\n' +
	'	<h3>' + L.cl_opts + '</h3>\n' +
	'	<div>\n' +
	'		<a id="tooltips" class="tgl btn" href="#" tt="' + L.ct_ttips + '</a>\n' +
	'		<a id="griden" class="tgl btn" href="#" tt="' + L.wt_grid + '">' + L.ct_grid + '</a>\n' +
	'		<a id="thumbs" class="tgl btn" href="#" tt="' + L.ct_thumb + '</a>\n' +
	'		<a id="csel" class="tgl btn" href="#" tt="' + L.ct_csel + '</a>\n' +
	'		<a id="ihop" class="tgl btn" href="#" tt="' + L.ct_ihop + '</a>\n' +
	'		<a id="dotfiles" class="tgl btn" href="#" tt="' + L.ct_dots + '</a>\n' +
	'		<a id="dir1st" class="tgl btn" href="#" tt="' + L.ct_dir1st + '</a>\n' +
	'		<a id="ireadme" class="tgl btn" href="#" tt="' + L.ct_readme + '</a>\n' +
	'		<a id="idxh" class="tgl btn" href="#" tt="' + L.ct_idxh + '</a>\n' +
	'		<a id="sbars" class="tgl btn" href="#" tt="' + L.ct_sbars + '</a>\n' +
	'	</div>\n' +
	'</div>\n' +
	'<div>\n' +
	'	<h3>' + L.cl_themes + '</h3>\n' +
	'	<div id="themes">\n' +
	'	</div>\n' +
	'</div>\n' +
	'<div>\n' +
	'	<h3>' + L.cl_langs + '</h3>\n' +
	'	<div id="langs">\n' +
	'	</div>\n' +
	'</div>\n' +
	(have_zip ? (
		'<div><h3>' + L.cl_ziptype + '</h3><div id="arc_fmt"></div></div>\n'
	) : '') +
	'<div>\n' +
	'	<h3>' + L.cl_uopts + '</h3>\n' +
	'	<div>\n' +
	'		<a id="ask_up" class="tgl btn" href="#" tt="' + L.ut_ask + '</a>\n' +
	'		<a id="umod" class="tgl btn" href="#" tt="' + L.cut_umod + '</a>\n' +
	'		<a id="hashw" class="tgl btn" href="#" tt="' + L.cut_mt + '</a>\n' +
	'		<a id="u2turbo" class="tgl btn ttb" href="#" tt="' + L.cut_turbo + '</a>\n' +
	'		<a id="u2tdate" class="tgl btn ttb" href="#" tt="' + L.cut_datechk + '</a>\n' +
	'		<input type="text" id="u2szg" value="" ' + NOAC + ' style="width:3em" tt="' + L.cut_u2sz + '" />' +
	'		<a id="flag_en" class="tgl btn" href="#" tt="' + L.cut_flag + '">💤</a>\n' +
	'		<a id="u2sort" class="tgl btn" href="#" tt="' + L.cut_az + '">az</a>\n' +
	'		<a id="upnag" class="tgl btn" href="#" tt="' + L.cut_nag + '">🔔</a>\n' +
	'		<a id="upsfx" class="tgl btn" href="#" tt="' + L.cut_sfx + '">🔊</a>\n' +
	'		</td>\n' +
	'	</div>\n' +
	'</div>\n' +
	'<div>\n' +
	'	<h3>' + L.cl_favico + ' <span id="ico1">🎉</span></h3>\n' +
	'	<div>\n' +
	'		<input type="text" id="icot" value="" ' + NOAC + ' style="width:1.3em" tt="' + L.cft_text + '" />' +
	'		<input type="text" id="icof" value="" ' + NOAC + ' style="width:2em" tt="' + L.cft_fg + '" />' +
	'		<input type="text" id="icob" value="" ' + NOAC + ' style="width:2em" tt="' + L.cft_bg + '" />' +
	'		</td>\n' +
	'	</div>\n' +
	'</div>\n' +
	'<div>\n' +
	'	<h3>' + L.cl_bigdir + '</h3>\n' +
	'	<div>\n' +
	'		<input type="text" id="bd_lim" value="250" ' + NOAC + ' style="width:4em" tt="' + L.cdt_lim + '" />' +
	'		<a id="bd_ask" class="tgl btn" href="#" tt="' + L.cdt_ask + '">ask</a>\n' +
	'		</td>\n' +
	'	</div>\n' +
	'</div>\n' +
	'<div><h3>' + L.cl_keytype + '</h3><div id="key_notation"></div></div>\n' +
	'<div><h3>' + L.cl_hiddenc + ' &nbsp;' + (MOBILE ? '<a href="#" id="hcolsh">' + L.cl_hidec + '</a> / ' : '') + '<a href="#" id="hcolsr">' + L.cl_reset + '</a></h3><div id="hcols"></div></div>'
);


// navpane
ebi('tree').innerHTML = (
	'<div id="treeh">\n' +
	'	<a href="#" id="detree" tt="' + L.tt_detree + '">🍞...</a>\n' +
	'	<a href="#" class="btn" step="2" id="twobytwo" tt="Hotkey: D">+</a>\n' +
	'	<a href="#" class="btn" step="-2" id="twig" tt="Hotkey: A">&ndash;</a>\n' +
	'	<a href="#" class="btn" id="visdir" tt="' + L.tt_visdir + '">🎯</a>\n' +
	'	<a href="#" class="tgl btn" id="filetree" tt="' + L.tt_ftree + '">📃</a>\n' +
	'	<a href="#" class="tgl btn" id="parpane" tt="' + L.tt_pdock + '">📌</a>\n' +
	'	<a href="#" class="tgl btn" id="dyntree" tt="' + L.tt_dynt + '">a</a>\n' +
	'	<a href="#" class="tgl btn" id="wraptree" tt="' + L.tt_wrap + '">↵</a>\n' +
	'	<a href="#" class="tgl btn" id="hovertree" tt="' + L.tt_hover + '">👀</a>\n' +
	'</div>\n' +
	'<ul id="docul"></ul>\n' +
	'<ul class="ntree" id="treepar"></ul>\n' +
	'<ul class="ntree" id="treeul"></ul>\n' +
	'<div id="thx_ff">&nbsp;</div>'
);
clmod(ebi('tree'), 'sbar', 1);
ebi('entree').setAttribute('tt', L.tt_entree);
ebi('goh').textContent = L.goh;
QS('#op_mkdir input[type="submit"]').value = L.ab_mkdir;
QS('#op_new_md input[type="submit"]').value = L.ab_mkdoc;
QS('#op_msg input[type="submit"]').value = L.ab_msg;


(function () {
	var ops = QSA('#ops>a');
	for (var a = 0; a < ops.length; a++) {
		ops[a].onclick = opclick;
		var v = ops[a].getAttribute('data-dest');
		if (v)
			ops[a].href = '#v=' + v;
	}
})();


function opclick(e) {
	var dest = this.getAttribute('data-dest');
	if (QS('#op_' + dest + '.act'))
		dest = '';

	swrite('opmode', dest || null);
	if (ctrl(e))
		return;

	ev(e);
	goto(dest);

	var input = QS('.opview.act input:not([type="hidden"])')
	if (input && !TOUCH) {
		tt.skip = true;
		input.focus();
	}
}


function goto(dest) {
	var obj = QSA('.opview.act');
	for (var a = obj.length - 1; a >= 0; a--)
		clmod(obj[a], 'act');

	obj = QSA('#ops>a');
	for (var a = obj.length - 1; a >= 0; a--)
		clmod(obj[a], 'act');

	if (dest) {
		var lnk = QS('#ops>a[data-dest=' + dest + ']'),
			nps = lnk.getAttribute('data-perm');

		nps = nps && nps.length ? nps.split(' ') : [];

		if (perms.length)
			for (var a = 0; a < nps.length; a++)
				if (!has(perms, nps[a]))
					return;

		if (!has(perms, 'read') && !has(perms, 'write') && (dest == 'up2k'))
			return;

		clmod(ebi('op_' + dest), 'act', 1);
		clmod(lnk, 'act', 1);

		var fn = window['goto_' + dest];
		if (fn)
			fn();
	}

	clmod(document.documentElement, 'op_open', dest);

	if (treectl)
		treectl.onscroll();
}


var SBW, SBH;  // scrollbar size
(function () {
	var el = mknod('div');
	el.style.cssText = 'overflow:scroll;width:100px;height:100px';
	document.body.appendChild(el);
	SBW = el.offsetWidth - el.clientWidth;
	SBH = el.offsetHeight - el.clientHeight;
	document.body.removeChild(el);
})();


var have_webp = sread('have_webp');
(function () {
	if (have_webp !== null)
		return;

	var img = new Image();
	img.onload = function () {
		have_webp = img.width > 0 && img.height > 0;
		swrite('have_webp', 'ya');
	};
	img.onerror = function () {
		have_webp = false;
		swrite('have_webp', '');
	};
	img.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
})();


function set_files_html(html) {
	var files = ebi('files');
	try {
		files.innerHTML = html;
		return files;
	}
	catch (e) {
		var par = files.parentNode;
		par.removeChild(files);
		files = mknod('div');
		files.innerHTML = '<table id="files">' + html + '</table>';
		par.insertBefore(files.childNodes[0], ebi('lazy'));
		files = ebi('files');
		return files;
	}
}


// actx breaks background album playback on ios
var ACtx = !IPHONE && (window.AudioContext || window.webkitAudioContext),
	ACB = sread('au_cbv') || 1,
	noih = /[?&]v\b/.exec('' + location),
	hash0 = location.hash,
	ldks = [],
	dks = {},
	dk, mp;


if (window.og_fn) {
	hash0 = 1;
	hist_replace(vsplit(get_evpath())[0]);
}


var mpl = (function () {
	var have_mctl = 'mediaSession' in navigator && window.MediaMetadata;

	ebi('op_player').innerHTML = (
		'<div><h3>' + L.cl_opts + '</h3><div>' +
		'<a href="#" class="tgl btn" id="au_shuf" tt="' + L.mt_shuf + '</a>' +
		'<a href="#" class="tgl btn" id="au_aplay" tt="' + L.mt_aplay + '</a>' +
		'<a href="#" class="tgl btn" id="au_preload" tt="' + L.mt_preload + '</a>' +
		'<a href="#" class="tgl btn" id="au_prescan" tt="' + L.mt_prescan + '</a>' +
		'<a href="#" class="tgl btn" id="au_fullpre" tt="' + L.mt_fullpre + '</a>' +
		'<a href="#" class="tgl btn" id="au_fau" tt="' + L.mt_fau + '</a>' +
		'<a href="#" class="tgl btn" id="au_waves" tt="' + L.mt_waves + '</a>' +
		'<a href="#" class="tgl btn" id="au_npclip" tt="' + L.mt_npclip + '</a>' +
		'<a href="#" class="tgl btn" id="au_os_ctl" tt="' + L.mt_octl + '</a>' +
		'<a href="#" class="tgl btn" id="au_os_seek" tt="' + L.mt_oseek + '</a>' +
		'<a href="#" class="tgl btn" id="au_osd_cv" tt="' + L.mt_oscv + '</a>' +
		'<a href="#" class="tgl btn" id="au_follow" tt="' + L.mt_follow + '</a>' +
		'<a href="#" class="tgl btn" id="au_compact" tt="' + L.mt_compact + '</a>' +
		'</div></div>' +

		'<div><h3>' + L.ml_btns + '</h3><div>' +
		'<a href="#" class="btn" id="au_uncache" tt="' + L.mt_uncache + '</a>' +
		'</div></div>' +

		'<div><h3>' + L.ml_pmode + '</h3><div id="pb_mode">' +
		'<a href="#" class="tgl btn" m="loop" tt="' + L.mt_mloop + '</a>' +
		'<a href="#" class="tgl btn" m="next" tt="' + L.mt_mnext + '</a>' +
		'</div></div>' +

		(have_acode ? (
			'<div><h3>' + L.ml_tcode + '</h3><div>' +
			'<a href="#" id="ac_flac" class="tgl btn" tt="' + L.mt_cflac + '</a>' +
			'<a href="#" id="ac_aac" class="tgl btn" tt="' + L.mt_caac + '</a>' +
			'<a href="#" id="ac_oth" class="tgl btn" tt="' + L.mt_coth + '</a>' +
			'</div></div>'
		) : '') +

		'<div><h3>' + L.ml_tint + '</h3><div>' +
		'<input type="text" id="pb_tint" value="0" ' + NOAC + ' style="width:2.4em" tt="' + L.mt_tint + '" />' +
		'</div></div>' +

		'<div><h3 id="h_drc">' + L.ml_drc + '</h3><div id="audio_drc"></div></div>' +
		'<div><h3>' + L.ml_eq + '</h3><div id="audio_eq"></div></div>' +
		'');

	var r = {
		"pb_mode": (sread('pb_mode', ['loop', 'next']) || 'next').split('-')[0],
		"os_ctl": bcfg_get('au_os_ctl', have_mctl) && have_mctl,
		'traversals': 0,
	};
	bcfg_bind(r, 'shuf', 'au_shuf', false, function () {
		mp.read_order();  // don't bind
	});
	bcfg_bind(r, 'aplay', 'au_aplay', true);
	bcfg_bind(r, 'preload', 'au_preload', true);
	bcfg_bind(r, 'prescan', 'au_prescan', true);
	bcfg_bind(r, 'fullpre', 'au_fullpre', false);
	bcfg_bind(r, 'fau', 'au_fau', MOBILE && !IPHONE, function (v) {
		mp.nopause();
		if (mp.fau) {
			mp.fau.pause();
			mp.fau = mpo.fau = null;
			console.log('stop fau');
		}
		mp.init_fau();
	});
	bcfg_bind(r, 'waves', 'au_waves', true, function (v) {
		if (!v) pbar.unwave();
	});
	bcfg_bind(r, 'os_seek', 'au_os_seek', !IPHONE, announce);
	bcfg_bind(r, 'osd_cv', 'au_osd_cv', true, announce);
	bcfg_bind(r, 'clip', 'au_npclip', false, function (v) {
		clmod(ebi('wtoggle'), 'np', v && mp.au);
	});
	bcfg_bind(r, 'follow', 'au_follow', false, setaufollow);
	bcfg_bind(r, 'ac_flac', 'ac_flac', true);
	bcfg_bind(r, 'ac_aac', 'ac_aac', false);
	bcfg_bind(r, 'ac_oth', 'ac_oth', true, reload_mp);
	if (!have_acode)
		r.ac_flac = r.ac_aac = r.ac_oth = false;

	if (IPHONE) {
		ebi('au_fullpre').style.display = 'none';
		r.fullpre = false;
	}

	ebi('au_uncache').onclick = function (e) {
		ev(e);
		ACB = (Date.now() % 46656).toString(36);
		swrite('au_cbv', ACB);
		reload_mp();
		toast.inf(5, L.mm_uncache);
	};

	ebi('au_os_ctl').onclick = function (e) {
		ev(e);
		r.os_ctl = !r.os_ctl && have_mctl;
		bcfg_set('au_os_ctl', r.os_ctl);
		if (!have_mctl)
			toast.err(5, L.mp_breq);
	};

	function draw_pb_mode() {
		var btns = QSA('#pb_mode>a');
		for (var a = 0, aa = btns.length; a < aa; a++) {
			clmod(btns[a], 'on', btns[a].getAttribute("m") == r.pb_mode);
			btns[a].onclick = set_pb_mode;
		}
	}
	draw_pb_mode();

	function set_pb_mode(e) {
		ev(e);
		r.pb_mode = this.getAttribute('m');
		swrite('pb_mode', r.pb_mode);
		draw_pb_mode();
	}

	function set_tint() {
		var tint = icfg_get('pb_tint', 0);
		if (!tint)
			ebi('barbuf').style.removeProperty('background');
		else
			ebi('barbuf').style.background = 'rgba(126,163,75,' + (tint / 100.0) + ')';
	}
	ebi('pb_tint').oninput = function (e) {
		swrite('pb_tint', this.value);
		set_tint();
	};
	set_tint();

	r.acode = function (url) {
		var c = true,
			cs = url.split('?')[0];

		if (!have_acode)
			c = false;
		else if (/\.(wav|flac)$/i.exec(cs))
			c = r.ac_flac;
		else if (/\.(aac|m4a)$/i.exec(cs))
			c = r.ac_aac;
		else if (/\.(ogg|opus)$/i.exec(cs) && !can_ogg)
			c = true;
		else if (re_au_native.exec(cs))
			c = false;

		if (!c)
			return url;

		return addq(url, 'th=' + (can_ogg ? 'opus' : (IPHONE || MACOS) ? 'caf' : 'mp3'));
	};

	r.pp = function () {
		var adur, apos, playing = mp.au && !mp.au.paused;

		clearTimeout(mpl.t_eplay);

		clmod(ebi('np_inf'), 'playing', playing);

		if (mp.au && isNum(adur = mp.au.duration) && isNum(apos = mp.au.currentTime) && apos >= 0)
			ebi('np_pos').textContent = s2ms(apos);

		if (!r.os_ctl)
			return;

		navigator.mediaSession.playbackState = playing ? "playing" : "paused";
	};

	function setaufollow() {
		window[(r.follow ? "add" : "remove") + "EventListener"]("resize", scroll2playing);
	}
	setaufollow();

	function announce() {
		if (!r.os_ctl || !mp.au)
			return;

		var np = get_np()[0],
			fns = np.file.split(' - '),
			artist = (np.circle && np.circle != np.artist ? np.circle + ' // ' : '') + (np.artist || (fns.length > 1 ? fns[0] : '')),
			title = np.title || fns.pop(),
			cover = '',
			tags = { title: title };

		if (artist)
			tags.artist = artist;

		if (np.album)
			tags.album = np.album;

		if (r.osd_cv) {
			var files = QSA("#files tr>td:nth-child(2)>a[id]"),
				cover = null;

			for (var a = 0, aa = files.length; a < aa; a++) {
				if (/^(cover|folder)\.(jpe?g|png|gif)$/i.test(files[a].textContent)) {
					cover = files[a].getAttribute('href');
					break;
				}
			}

			if (cover) {
				cover = addq(cover, 'th=j');
				tags.artwork = [{ "src": cover, type: "image/jpeg" }];
			}
		}

		ebi('np_circle').textContent = np.circle || '';
		ebi('np_album').textContent = np.album || '';
		ebi('np_tn').textContent = np['.tn'] || '';
		ebi('np_artist').textContent = np.artist || (fns.length > 1 ? fns[0] : '');
		ebi('np_title').textContent = np.title || '';
		ebi('np_dur').textContent = np['.dur'] || '';
		ebi('np_url').textContent = get_vpath() + np.file.split('?')[0];
		if (!MOBILE && cover)
			ebi('np_img').setAttribute('src', cover);
		else
			ebi('np_img').removeAttribute('src');

		navigator.mediaSession.metadata = new MediaMetadata(tags);
		navigator.mediaSession.setActionHandler('play', mplay);
		navigator.mediaSession.setActionHandler('pause', mpause);
		navigator.mediaSession.setActionHandler('seekbackward', r.os_seek ? function () { seek_au_rel(-10); } : null);
		navigator.mediaSession.setActionHandler('seekforward', r.os_seek ? function () { seek_au_rel(10); } : null);
		navigator.mediaSession.setActionHandler('previoustrack', prev_song);
		navigator.mediaSession.setActionHandler('nexttrack', next_song);
		r.pp();
	}
	r.announce = announce;

	r.stop = function () {
		if (!r.os_ctl)
			return;

		// dead code; left for debug
		navigator.mediaSession.metadata = null;
		navigator.mediaSession.playbackState = "paused";

		var hs = 'play pause seekbackward seekforward previoustrack nexttrack'.split(/ /g);
		for (var a = 0; a < hs.length; a++)
			navigator.mediaSession.setActionHandler(hs[a], null);

		navigator.mediaSession.setPositionState();
	};

	r.unbuffer = function (url) {
		if (mp.au2 && (!url || mp.au2.rsrc == url)) {
			mp.au2.src = mp.au2.rsrc = '';
			mp.au2.load();
		}
		if (!url)
			mpl.preload_url = null;
	}

	return r;
})();


var can_ogg = true;
try {
	can_ogg = new Audio().canPlayType('audio/ogg; codecs=opus') === 'probably';
}
catch (ex) { }


var re_au_native = (can_ogg || have_acode) ? /\.(aac|flac|m4a|mp3|ogg|opus|wav)$/i : /\.(aac|flac|m4a|mp3|wav)$/i,
	re_au_all = /\.(aac|ac3|aif|aiff|alac|alaw|amr|ape|au|dfpwm|dts|flac|gsm|it|itgz|itxz|itz|m4a|mdgz|mdxz|mdz|mo3|mod|mp2|mp3|mpc|mptm|mt2|mulaw|ogg|okt|opus|ra|s3m|s3gz|s3xz|s3z|tak|tta|ulaw|wav|wma|wv|xm|xmgz|xmxz|xmz|xpk|3gp|asf|avi|flv|m4v|mkv|mov|mp4|mpeg|mpeg2|mpegts|mpg|mpg2|nut|ogm|ogv|rm|ts|vob|webm|wmv)$/i;


// extract songs + add play column
var mpo = { "au": null, "au2": null, "acs": null, "fau": null };
function MPlayer() {
	var r = this;
	r.id = Date.now();
	r.au = mpo.au;
	r.au2 = mpo.au2;
	r.acs = mpo.acs;
	r.fau = mpo.fau;
	r.tracks = {};
	r.order = [];
	r.cd_pause = 0;

	var re_audio = have_acode && mpl.ac_oth ? re_au_all : re_au_native,
		trs = QSA('#files tbody tr');

	for (var a = 0, aa = trs.length; a < aa; a++) {
		var tds = trs[a].getElementsByTagName('td'),
			link = tds[1].getElementsByTagName('a');

		link = link[link.length - 1];
		var url = link.getAttribute('href'),
			m = re_audio.exec(url.split('?')[0]);

		if (m) {
			var tid = link.getAttribute('id');
			r.order.push(tid);
			r.tracks[tid] = url;
			tds[0].innerHTML = '<a id="a' + tid + '" href="#a' + tid + '" class="play">' + L.mb_play + '</a></td>';
			ebi('a' + tid).onclick = ev_play;
			clmod(trs[a], 'au', 1);
		}
	}

	r.vol = clamp(fcfg_get('vol', IPHONE ? 1 : dvol / 100), 0, 1);

	r.expvol = function (v) {
		return 0.5 * v + 0.5 * v * v;
	};

	r.setvol = function (vol) {
		r.vol = clamp(vol, 0, 1);
		swrite('vol', vol);
		r.stopfade(true);

		if (r.au)
			r.au.volume = r.expvol(r.vol);
	};

	r.shuffle = function () {
		if (!mpl.shuf)
			return;

		// durstenfeld
		for (var a = r.order.length - 1; a > 0; a--) {
			var b = Math.floor(Math.random() * (a + 1)),
				c = r.order[a];
			r.order[a] = r.order[b];
			r.order[b] = c;
		}
	};
	r.shuffle();

	r.read_order = function () {
		var order = [],
			links = QSA('#files>tbody>tr>td:nth-child(1)>a');

		for (var a = 0, aa = links.length; a < aa; a++) {
			var tid = links[a].getAttribute('id');
			if (!tid || tid.indexOf('af-') !== 0)
				continue;

			order.push(tid.slice(1));
		}
		r.order = order;
		r.shuffle();
	};

	r.fdir = 0;
	r.fvol = -1;
	r.ftid = -1;
	r.ftimer = null;
	r.fade_in = function () {
		r.nopause();
		r.fvol = 0;
		r.fdir = 0.025 * r.vol * (CHROME ? 1.5 : 1);
		if (r.au) {
			r.ftid = r.au.tid;
			r.au.play();
			mpl.pp();
			fader();
		}
	};
	r.fade_out = function () {
		r.fvol = r.vol;
		r.fdir = -0.05 * r.vol * (CHROME ? 2 : 1);
		r.ftid = r.au.tid;
		fader();
	};
	r.stopfade = function (hard) {
		clearTimeout(r.ftimer);
		if (hard)
			r.ftid = -1;
	}
	function fader() {
		r.stopfade();
		if (!r.au || r.au.tid !== r.ftid)
			return;

		var done = true;
		r.fvol += r.fdir / (r.fdir < 0 && r.fvol < r.vol / 4 ? 2 : 1);
		if (r.fvol < 0) {
			r.fvol = 0;
			r.au.pause();
			mpl.pp();

			var t = r.au.currentTime - 0.8;
			if (isNum(t))
				r.au.currentTime = Math.max(t, 0);
		}
		else if (r.fvol > r.vol)
			r.fvol = r.vol;
		else
			done = false;

		r.au.volume = r.expvol(r.fvol);
		if (!done)
			setTimeout(fader, 10);
	}

	r.preload = function (url, full) {
		var t0 = Date.now(),
			fname = uricom_dec(url.split('/').pop().split('?')[0]);

		url = addq(mpl.acode(url), 'cache=987&_=' + ACB);
		mpl.preload_url = full ? url : null;

		if (mpl.waves)
			fetch(url.replace(/\bth=(opus|mp3)&/, '') + '&th=p').then(function (x) {
				x.body.getReader().read();
			});

		if (full)
			return fetch(url).then(function (x) {
				var rd = x.body.getReader(), n = 0;
				function spd() {
					return humansize(n / ((Date.now() + 1 - t0) / 1000)) + '/s';
				}
				function drop(x) {
					if (x && x.done)
						return console.log('xhr-preload finished, ' + spd());

					if (x && x.value && x.value.length)
						n += x.value.length;

					if (mpl.preload_url !== url || n >= 128 * 1024 * 1024) {
						console.log('xhr-preload aborted at ' + Math.floor(n / 1024) + ' KiB, ' + spd() + ' for ' + url);
						return rd.cancel();
					}

					return rd.read().then(drop);
				}
				drop();
			});

		r.nopause();
		r.au2.onloadeddata = r.au2.onloadedmetadata = r.nopause;
		r.au2.preload = "auto";
		r.au2.src = r.au2.rsrc = url;

		if (mpl.prescan_evp) {
			mpl.prescan_evp = null;
			toast.ok(7, L.mm_scank + "\n" + esc(fname));
		}
		console.log("preloading " + fname);
	};

	r.nopause = function () {
		r.cd_pause = Date.now();
	};

	r.init_fau = function () {
		if (r.fau || !mpl.fau)
			return;

		// breaks touchbar-macs
		console.log('init fau');
		r.fau = new Audio(SR + '/.cpr/deps/busy.mp3?_=' + TS);
		r.fau.loop = true;
		r.fau.play();
	};
}


function ft2dict(tr, skip) {
	var th = ebi('files').tHead.rows[0].cells,
		rv = [],
		rh = [],
		ra = [],
		rt = {};

	skip = skip || {};

	for (var a = 1, aa = th.length; a < aa; a++) {
		var tv = tr.cells[a].textContent,
			tk = a == 1 ? 'file' : th[a].getAttribute('name').split('/').pop().toLowerCase(),
			vis = th[a].className.indexOf('min') === -1;

		if (!tv || skip[tk])
			continue;

		(vis ? rv : rh).push(tk);
		ra.push(tk);
		rt[tk] = tv;
	}
	return [rt, rv, rh, ra];
}


function get_np() {
	var tr = QS('#files tr.play');
	return ft2dict(tr, { 'up_ip': 1 });
};


// toggle player widget
var widget = (function () {
	var r = {},
		widget = ebi('widget'),
		wtico = ebi('wtico'),
		nptxt = ebi('nptxt'),
		npirc = ebi('npirc'),
		touchmode = false,
		was_paused = true;

	r.open = function () {
		return r.set(true);
	};
	r.close = function () {
		return r.set(false);
	};
	r.set = function (is_open) {
		if (r.is_open == is_open)
			return false;

		clmod(document.documentElement, 'np_open', is_open);
		clmod(widget, 'open', is_open);
		bcfg_set('au_open', r.is_open = is_open);
		if (vbar) {
			pbar.onresize();
			vbar.onresize();
		}
		return true;
	};
	r.toggle = function (e) {
		r.open() || r.close();
		ev(e);
		return false;
	};
	r.paused = function (paused) {
		if (was_paused != paused) {
			was_paused = paused;
			ebi('bplay').innerHTML = paused ? '▶' : '⏸';
		}
	};
	wtico.onclick = function (e) {
		if (!touchmode)
			r.toggle(e);

		return false;
	};
	npirc.onclick = nptxt.onclick = function (e) {
		ev(e);
		var irc = this.getAttribute('id') == 'npirc',
			ck = irc ? '06' : '',
			cv = irc ? '07' : '',
			m = ck + 'np: ',
			npr = get_np(),
			npk = npr[1],
			np = npr[0];

		for (var a = 0; a < npk.length; a++)
			m += (npk[a] == 'file' ? '' : npk[a]).replace(/^\./, '') + '(' + cv + np[npk[a]] + ck + ') // ';

		m += '[' + cv + s2ms(mp.au.currentTime) + ck + '/' + cv + s2ms(mp.au.duration) + ck + ']';

		cliptxt(m, function () {
			toast.ok(1, L.clipped, null, 'top');
		});
	};
	r.set(sread('au_open') == 1);
	setTimeout(function () {
		clmod(widget, 'anim', 1);
	}, 10);
	return r;
})();


function canvas_cfg(can) {
	var r = {},
		b = can.getBoundingClientRect(),
		mul = window.devicePixelRatio || 1;

	r.w = b.width;
	r.h = b.height;
	can.width = r.w * mul;
	can.height = r.h * mul;

	r.can = can;
	r.ctx = can.getContext('2d');
	r.ctx.scale(mul, mul);
	return r;
}


function glossy_grad(can, h, s, l) {
	var g = can.ctx.createLinearGradient(0, 0, 0, can.h),
		p = [0, 0.49, 0.50, 1];

	for (var a = 0; a < p.length; a++)
		g.addColorStop(p[a], 'hsl(' + h + ',' + s[a] + '%,' + l[a] + '%)');

	return g;
}


// buffer/position bar
var pbar = (function () {
	var r = {},
		bau = null,
		html_txt = 'a',
		lastmove = 0,
		mousepos = 0,
		t_redraw = 0,
		gradh = -1,
		grad;

	r.onresize = function () {
		if (!widget.is_open && r.buf)
			return;

		r.buf = canvas_cfg(ebi('barbuf'));
		r.pos = canvas_cfg(ebi('barpos'));
		r.buf.ctx.font = '.5em sans-serif';
		r.pos.ctx.font = '.9em sans-serif';
		r.pos.ctx.strokeStyle = 'rgba(24,56,0,0.5)';
		r.drawbuf();
		r.drawpos();
		if (!r.pos.can.onmouseleave)
			mleave();
	};

	r.loadwaves = function (url) {
		r.wurl = url;
		var img = new Image();
		img.onload = function () {
			if (r.wurl != url)
				return;

			r.wimg = img;
			r.onresize();
		};
		img.src = url;
	};

	r.unwave = function () {
		r.wurl = r.wimg = null;
	}

	function mmove(e) {
		var adur;
		if (e.buttons || !mp || !mp.au || !isNum(adur = mp.au.duration))
			return;

		var rect = r.pos.can.getBoundingClientRect(),
			x = e.clientX - rect.left,
			mul = x * 1.0 / rect.width;

		mousepos = adur * mul;
		lastmove = Date.now();
		r.drawpos();
	}
	function menter() {
		r.pos.can.onmousemove = mmove;
		r.pos.can.onmouseleave = mleave;
	}
	function mleave() {
		r.pos.can.onmousemove = null;
		r.pos.can.onmouseleave = null;
		r.pos.can.onmouseenter = menter;
		if (lastmove) {
			lastmove = 0;
			r.drawpos();
		}
	}

	r.drawbuf = function () {
		var bc = r.buf,
			pc = r.pos,
			bctx = bc.ctx,
			apos, adur;

		if (!widget.is_open)
			return;

		bctx.clearRect(0, 0, bc.w, bc.h);

		if (!mp || !mp.au || !isNum(adur = mp.au.duration) || !isNum(apos = mp.au.currentTime) || apos < 0 || adur < apos)
			return;  // not-init || unsupp-codec

		bau = mp.au;

		var sm = bc.w * 1.0 / mp.au.duration,
			gk = bc.h + '/' + themen,
			dz = themen == 'dz',
			dy = themen == 'dy';

		if (gradh != gk) {
			gradh = gk;
			grad = glossy_grad(bc, dz ? 120 : 85,
				dy ? [0, 0, 0, 0] : [35, 40, 37, 35],
				dy ? [20, 24, 22, 20] : light ? [45, 56, 50, 45] : [42, 51, 47, 42]);
		}
		bctx.fillStyle = grad;
		for (var a = 0; a < mp.au.buffered.length; a++) {
			var x1 = sm * mp.au.buffered.start(a),
				x2 = sm * mp.au.buffered.end(a);

			bctx.fillRect(x1, 0, x2 - x1, bc.h);
		}
		if (r.wimg) {
			bctx.globalAlpha = 0.6;
			bctx.filter = light ? '' : 'invert(1)';
			bctx.drawImage(r.wimg, 0, 0, bc.w, bc.h);
			bctx.filter = 'invert(0)';
			bctx.globalAlpha = 1;
		}

		var step = sm > 1 ? 1 : sm > 0.4 ? 3 : sm > 0.05 ? 30 : 720;
		bctx.fillStyle = light && !dy ? 'rgba(0,64,0,0.15)' : 'rgba(204,255,128,0.15)';
		for (var p = step, mins = adur / 10; p <= mins; p += step)
			bctx.fillRect(Math.floor(sm * p * 10), 0, 2, pc.h);

		step = sm > 0.15 ? 1 : sm > 0.05 ? 10 : 360;
		bctx.fillStyle = light && !dy ? 'rgba(0,64,0,0.5)' : 'rgba(192,255,96,0.5)';
		for (var p = step, mins = adur / 60; p <= mins; p += step)
			bctx.fillRect(Math.floor(sm * p * 60), 0, 2, pc.h);

		step = sm > 0.33 ? 1 : sm > 0.15 ? 5 : sm > 0.05 ? 10 : sm > 0.01 ? 60 : 720;
		bctx.fillStyle = dz ? '#0f0' : dy ? '#999' : light ? 'rgba(0,64,0,0.9)' : 'rgba(192,255,96,1)';
		for (var p = step, mins = adur / 60; p <= mins; p += step) {
			bctx.fillText(p, Math.floor(sm * p * 60 + 3), pc.h / 3);
		}

		step = sm > 0.2 ? 10 : sm > 0.1 ? 30 : sm > 0.01 ? 60 : sm > 0.005 ? 720 : 1440;
		bctx.fillStyle = light ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)';
		for (var p = step, mins = adur / 60; p <= mins; p += step)
			bctx.fillRect(Math.floor(sm * p * 60), 0, 2, pc.h);
	};

	r.drawpos = function () {
		var bc = r.buf,
			pc = r.pos,
			pctx = pc.ctx,
			w = 8,
			apos, adur;

		if (t_redraw) {
			clearTimeout(t_redraw);
			t_redraw = 0;
		}
		pctx.clearRect(0, 0, pc.w, pc.h);

		if (!mp || !mp.au)
			return;  // not-init

		if (!isNum(adur = mp.au.duration) || !isNum(apos = mp.au.currentTime) || apos < 0 || adur < apos) {
			if (Date.now() - mp.au.pt0 < 500)
				return;

			pctx.fillStyle = light ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
			var m = /[?&]th=(opus|caf|mp3)/.exec('' + mp.au.rsrc),
				txt = mp.au.ded ? L.mm_playerr.replace(':', ' ;_;') :
					m ? L.mm_bconv.format(m[1]) : L.mm_bload;

			pctx.fillText(txt, 16, pc.h / 1.5);
			return;  // not-init || unsupp-codec
		}

		if (bau != mp.au)
			r.drawbuf();

		if (Date.now() - lastmove < 400) {
			apos = mousepos;
			w = 0;
		}

		var sm = bc.w * 1.0 / adur,
			t1 = s2ms(adur),
			t2 = s2ms(apos),
			x = sm * apos;

		if (w && html_txt != t2) {
			ebi('np_pos').textContent = html_txt = t2;
			if (mpl.os_ctl)
				navigator.mediaSession.setPositionState({
					'duration': adur,
					'position': apos,
					'playbackRate': 1
				});
		}

		if (!widget.is_open)
			return;

		pctx.fillStyle = '#573'; pctx.fillRect((x - w / 2) - 1, 0, w + 2, pc.h);
		pctx.fillStyle = '#dfc'; pctx.fillRect((x - w / 2), 0, w, pc.h);

		pctx.lineWidth = 2.5;
		pctx.fillStyle = '#fff';

		var m1 = pctx.measureText(t1),
			m1b = pctx.measureText(t1 + ":88"),
			m2 = pctx.measureText(t2),
			yt = pc.h * 0.94,
			xt1 = pc.w - (m1.width + 12),
			xt2 = x < m1.width * 1.4 ? (x + 12) : (Math.min(pc.w - m1b.width, x - 12) - m2.width);

		pctx.strokeText(t1, xt1 + 1, yt + 1);
		pctx.strokeText(t2, xt2 + 1, yt + 1);
		pctx.strokeText(t1, xt1, yt);
		pctx.strokeText(t2, xt2, yt);
		pctx.fillText(t1, xt1, yt);
		pctx.fillText(t2, xt2, yt);

		if (sm > 10)
			t_redraw = setTimeout(r.drawpos, sm > 50 ? 20 : 50);
	};

	onresize100.add(r.onresize, true);
	return r;
})();


// volume bar
var vbar = (function () {
	var r = {},
		gradh = -1,
		lastv = -1,
		untext = -1,
		can, ctx, w, h, grad1, grad2;

	r.onresize = function () {
		if (!widget.is_open && r.can)
			return;

		r.can = canvas_cfg(ebi('pvol'));
		can = r.can.can;
		ctx = r.can.ctx;
		ctx.font = '.7em sans-serif';
		w = r.can.w;
		h = r.can.h;
		r.draw();
	}

	r.draw = function () {
		if (!mp)
			return;

		var gh = h + '' + light,
			dz = themen == 'dz',
			dy = themen == 'dy';

		if (gradh != gh) {
			gradh = gh;
			grad1 = glossy_grad(r.can, dz ? 120 : 50,
				dy ? [0, 0, 0, 0] : light ? [50, 55, 52, 48] : [45, 52, 47, 43],
				dy ? [20, 24, 22, 20] : light ? [54, 60, 52, 47] : [42, 51, 47, 42]);
			grad2 = glossy_grad(r.can, dz ? 120 : 205,
				dz ? [100, 100, 100, 100] : dy ? [0, 0, 0, 0] : [10, 15, 13, 10],
				dz ? [10, 14, 12, 10] : dy ? [90, 90, 90, 90] : [16, 20, 18, 16]);
		}
		ctx.fillStyle = grad2; ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = grad1; ctx.fillRect(0, 0, w * mp.vol, h);

		if (Date.now() - lastv > 1000)
			return;

		var vt = Math.floor(mp.vol * 100),
			tw = ctx.measureText(vt).width;

		var li = dy;
		if (mp.vol < 0.05)
			li = !li;

		ctx.fillStyle = li ? '#fff' : '#210';
		ctx.fillText(vt, Math.max(4, w * mp.vol - tw - 8), h / 3 * 2);

		clearTimeout(untext);
		untext = setTimeout(r.draw, 1000);
	};
	onresize100.add(r.onresize, true);

	var rect;
	function mousedown(e) {
		rect = can.getBoundingClientRect();
		mousemove(e);
	}
	function mousemove(e) {
		if (e.changedTouches && e.changedTouches.length > 0) {
			e = e.changedTouches[0];
		}
		else if (e.buttons === 0) {
			can.onmousemove = null;
			return;
		}

		var x = e.clientX - rect.left,
			mul = x * 1.0 / rect.width;

		if (mul > 0.98)
			mul = 1;

		lastv = Date.now();
		mp.setvol(mul);
		r.draw();

		setTimeout(function () {
			if (IPHONE && mp.au && mul < 0.9 && mp.au.volume == 1)
				toast.inf(6, 'volume doesnt work because <a href="https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW11" target="_blank">apple says no</a>');
		}, 1);
	}
	can.onmousedown = function (e) {
		if (e.button !== 0)
			return;

		can.onmousemove = mousemove;
		mousedown(e);
	};
	can.onmouseup = function (e) {
		if (e.button === 0)
			can.onmousemove = null;
	};
	if (TOUCH) {
		can.ontouchstart = mousedown;
		can.ontouchmove = mousemove;
	}
	return r;
})();


function seek_au_mul(mul) {
	if (mp.au)
		seek_au_sec(mp.au.duration * mul);
}

function seek_au_rel(sec) {
	if (mp.au)
		seek_au_sec(mp.au.currentTime + sec);
}

function seek_au_sec(seek) {
	if (!mp.au)
		return;

	console.log('seek: ' + seek);
	if (!isNum(seek))
		return;

	mp.nopause();
	mp.au.currentTime = seek;

	if (mp.au.paused)
		mp.fade_in();

	mpui.progress_updater();
}


function song_skip(n, dirskip) {
	var tid = mp.au && mp.au.evp == get_evpath() ? mp.au.tid : null,
		ofs = tid ? mp.order.indexOf(tid) : -1;

	if (dirskip && ofs + 1 && ofs > mp.order.length - 2) {
		toast.inf(10, L.mm_nof);
		console.log("mm_nof1");
		mpl.traversals = 0;
		return;
	}

	if (tid && !dirskip)
		play(ofs + n);
	else
		play(mp.order[n == -1 ? mp.order.length - 1 : 0]);
}
function next_song(e) {
	ev(e);
	if (mp.order.length) {
		var dirskip = mpl.traversals;
		mpl.traversals = 0;
		return song_skip(1, dirskip);
	}
	if (mpl.traversals++ < 5) {
		treectl.ls_cb = next_song;
		return tree_neigh(1);
	}
	toast.inf(10, L.mm_nof);
	console.log("mm_nof2");
	mpl.traversals = 0;
}
function last_song(e) {
	ev(e);
	if (mp.order.length) {
		mpl.traversals = 0;
		return song_skip(-1, true);
	}
	if (mpl.traversals++ < 5) {
		treectl.ls_cb = last_song;
		return tree_neigh(-1);
	}
	toast.inf(10, L.mm_nof);
	console.log("mm_nof2");
	mpl.traversals = 0;
}
function prev_song(e) {
	ev(e);

	if (mp.au && !mp.au.paused && mp.au.currentTime > 3)
		return seek_au_sec(0);

	return song_skip(-1);
}
function dl_song() {
	if (!mp || !mp.au) {
		var o = QSA('#files a[id]');
		for (var a = 0; a < o.length; a++)
			o[a].setAttribute('download', '');

		return toast.inf(10, L.f_dls);
	}

	var url = addq(mp.au.osrc, 'cache=987&_=' + ACB);
	dl_file(url);
}


function playpause(e) {
	// must be event-chain
	ev(e);
	if (mp.au) {
		if (mp.au.paused)
			mp.fade_in();
		else
			mp.fade_out();

		mpui.progress_updater();
	}
	else
		play(0, true);

	mpl.pp();
};


function mplay(e) {
	if (mp.au && !mp.au.paused)
		return;

	playpause(e);
}


function mpause(e) {
	if (mp.cd_pause > Date.now() - 100)
		return;

	if (mp.au && mp.au.paused)
		return;

	playpause(e);
}


// hook up the widget buttons
(function () {
	ebi('bplay').onclick = playpause;
	ebi('bprev').onclick = prev_song;
	ebi('bnext').onclick = next_song;

	var bar = ebi('barpos');

	bar.onclick = function (e) {
		if (!mp.au) {
			play(0, true);
			return mp.fade_in();
		}

		var rect = pbar.buf.can.getBoundingClientRect(),
			x = e.clientX - rect.left;

		seek_au_mul(x * 1.0 / rect.width);
	};

	if (!TOUCH) {
		bar.onwheel = function (e) {
			var dist = Math.sign(e.deltaY) * 10;
			if (Math.abs(e.deltaY) < 30 && !e.deltaMode)
				dist = e.deltaY;

			if (!dist || !mp.au)
				return true;

			seek_au_rel(dist);
			ev(e);
		};
		ebi('pvol').onwheel = function (e) {
			var dist = Math.sign(e.deltaY) * 10;
			if (Math.abs(e.deltaY) < 30 && !e.deltaMode)
				dist = e.deltaY;

			if (!dist || !mp.au)
				return true;

			dist *= -1;
			mp.setvol(mp.vol + dist / 500);
			vbar.draw();
			ev(e);
		};
	}
})();


// periodic tasks
var mpui = (function () {
	var r = {},
		nth = 0,
		preloaded = null,
		fpreloaded = null;

	r.progress_updater = function () {
		//console.trace();
		timer.add(updater_impl, true);
	};

	function repreload() {
		preloaded = fpreloaded = null;
	}

	function updater_impl() {
		if (!mp.au) {
			widget.paused(true);
			timer.rm(updater_impl);
			return;
		}

		var paint = !MOBILE || document.hasFocus();

		var pos = mp.au.currentTime;
		if (!isNum(pos))
			pos = 0;

		// indicate playback state in ui
		widget.paused(mp.au.paused);

		if (paint && ++nth > 69) {
			// android-chrome breaks aspect ratio with unannounced viewport changes
			nth = 0;
			if (MOBILE) {
				nth = 1;
				pbar.onresize();
				vbar.onresize();
			}
		}
		else if (paint) {
			// draw current position in song
			if (!mp.au.paused)
				pbar.drawpos();

			// occasionally draw buffered regions
			if (nth % 5 == 0)
				pbar.drawbuf();
		}

		// preload next song
		if (mpl.preload && preloaded != mp.au.rsrc) {
			var len = mp.au.duration,
				rem = pos > 1 ? len - pos : 999,
				full = null;

			if (rem < 7 || (!mpl.fullpre && (rem < 40 || (rem < 90 && pos > 10)))) {
				preloaded = fpreloaded = mp.au.rsrc;
				full = false;
			}
			else if (rem < 60 && mpl.fullpre && fpreloaded != mp.au.rsrc) {
				fpreloaded = mp.au.rsrc;
				full = true;
			}

			if (full !== null)
				try {
					var oi = mp.order.indexOf(mp.au.tid) + 1,
						evp = get_evpath();

					if (mpl.pb_mode == 'loop' || mp.au.evp != evp)
						oi = 0;

					if (oi >= mp.order.length) {
						if (!mpl.prescan)
							throw "prescan disabled";

						if (mpl.prescan_evp == evp)
							throw "evp match";

						if (mpl.traversals++ > 4) {
							mpl.prescan_evp = null;
							toast.inf(10, L.mm_nof);
							throw L.mm_nof;
						}

						mpl.prescan_evp = evp;
						toast.inf(10, L.mm_prescan);
						treectl.ls_cb = repreload;
						tree_neigh(1);
					}
					else
						mp.preload(mp.tracks[mp.order[oi]], full);
				}
				catch (ex) {
					console.log("preload failed", ex);
				}
		}

		if (mp.au.paused)
			timer.rm(updater_impl);
	}
	return r;
})();


// event from play button next to a file in the list
function ev_play(e) {
	ev(e);

	var fade = !mp.au || mp.au.paused;
	play(this.getAttribute('id').slice(1), true);
	if (fade)
		mp.fade_in();

	return false;
}


var actx = null;

function start_actx() {
	// bonus: speedhack for unfocused file hashing (removes 1sec delay on subtle.digest resolves)
	if (!actx) {
		if (!ACtx)
			return;

		actx = new ACtx();
		console.log('actx created');
	}
	try {
		if (actx.state == 'suspended') {
			actx.resume();
			setTimeout(function () {
				console.log('actx is ' + actx.state);
			}, 500);
		}
	}
	catch (ex) {
		console.log('actx start failed; ' + ex);
	}
}

var afilt = (function () {
	var r = {
		"eqen": false,
		"drcen": false,
		"bands": [31.25, 62.5, 125, 250, 500, 1000, 2000, 4000, 8000, 16000],
		"gains": [4, 3, 2, 1, 0, 0, 1, 2, 3, 4],
		"drcv": [-24, 30, 12, 0.01, 0.25],
		"drch": ['tresh', 'knee', 'ratio', 'atk', 'rls'],
		"drck": ['threshold', 'knee', 'ratio', 'attack', 'release'],
		"drcn": null,
		"filters": [],
		"filterskip": [],
		"plugs": [],
		"amp": 0,
		"chw": 1,
		"last_au": null,
		"acst": {}
	};

	function setvis(vis) {
		ebi('audio_eq').parentNode.style.display = ebi('audio_drc').parentNode.style.display = (vis ? '' : 'none');
	}

	setvis(ACtx);

	r.init = function () {
		start_actx();
		if (r.cfg)
			return;

		setvis(actx);

		// some browsers have insane high-frequency boost
		// (or rather the actual problem is Q but close enough)
		r.cali = (function () {
			try {
				var fi = actx.createBiquadFilter(),
					freqs = new Float32Array(1),
					mag = new Float32Array(1),
					phase = new Float32Array(1);

				freqs[0] = 14000;
				fi.type = 'peaking';
				fi.frequency.value = 18000;
				fi.Q.value = 0.8;
				fi.gain.value = 1;
				fi.getFrequencyResponse(freqs, mag, phase);

				return mag[0];  // 1.0407 good, 1.0563 bad
			}
			catch (ex) {
				return 0;
			}
		})();
		console.log('eq cali: ' + r.cali);

		var e1 = r.cali < 1.05;

		r.cfg = [ // hz, q, g
			[31.25 * 0.88, 0, 1.4],  // shelf
			[31.25 * 1.04, 0.7, 0.96],  // peak
			[62.5, 0.7, 1],
			[125, 0.8, 1],
			[250, 0.9, 1.03],
			[500, 0.9, 1.1],
			[1000, 0.9, 1.1],
			[2000, 0.9, 1.105],
			[4000, 0.88, 1.05],
			[8000 * 1.006, 0.73, e1 ? 1.24 : 1.2],
			[16000 * 0.89, 0.7, e1 ? 1.26 : 1.2],  // peak
			[16000 * 1.13, 0.82, e1 ? 1.09 : 0.75],  // peak
			[16000 * 1.205, 0, e1 ? 1.9 : 1.85]  // shelf
		];
	};

	try {
		r.amp = fcfg_get('au_eq_amp', r.amp);
		r.chw = fcfg_get('au_eq_chw', r.chw);
		var gains = jread('au_eq_gain', r.gains);
		if (r.gains.length == gains.length)
			r.gains = gains;

		r.drcv = jread('au_drcv', r.drcv);
	}
	catch (ex) { }

	r.draw = function () {
		jwrite('au_eq_gain', r.gains);
		swrite('au_eq_amp', r.amp);
		swrite('au_eq_chw', r.chw);

		var txt = QSA('input.eq_gain');
		for (var a = 0; a < r.bands.length; a++)
			txt[a].value = r.gains[a];

		QS('input.eq_gain[band="amp"]').value = r.amp;
		QS('input.eq_gain[band="chw"]').value = r.chw;
	};

	r.stop = function () {
		if (r.filters.length)
			for (var a = 0; a < r.filters.length; a++)
				r.filters[a].disconnect();

		r.filters = [];
		r.filterskip = [];

		for (var a = 0; a < r.plugs.length; a++)
			r.plugs[a].unload();

		if (!mp)
			return;

		if (mp.acs)
			mp.acs.disconnect();

		mp.acs = mpo.acs = null;
	};

	r.apply = function (v, au) {
		r.init();
		r.draw();

		if (!actx) {
			bcfg_set('au_eq', r.eqen = false);
			bcfg_set('au_drc', r.drcen = false);
		}
		else if (v === true && r.drcen && !r.eqen)
			bcfg_set('au_eq', r.eqen = true);
		else if (v === false && !r.eqen)
			bcfg_set('au_drc', r.drcen = false);

		r.drcn = null;

		var plug = false;
		for (var a = 0; a < r.plugs.length; a++)
			if (r.plugs[a].en)
				plug = true;

		au = au || (mp && mp.au);
		if (!actx || !au || (!r.eqen && !plug && !mp.acs))
			return;

		r.stop();
		au.id = au.id || Date.now();
		mp.acs = r.acst[au.id] = r.acst[au.id] || actx.createMediaElementSource(au);

		if (r.eqen)
			add_eq();

		for (var a = 0; a < r.plugs.length; a++)
			if (r.plugs[a].en)
				r.plugs[a].load();

		for (var a = 0; a < r.filters.length; a++)
			if (!has(r.filterskip, a))
				r.filters[a].connect(a ? r.filters[a - 1] : actx.destination);

		mp.acs.connect(r.filters.length ?
			r.filters[r.filters.length - 1] : actx.destination);
	}

	function add_eq() {
		var min, max;
		min = max = r.gains[0];
		for (var a = 1; a < r.gains.length; a++) {
			min = Math.min(min, r.gains[a]);
			max = Math.max(max, r.gains[a]);
		}

		var gains = [];
		for (var a = 0; a < r.gains.length; a++)
			gains.push(r.gains[a] - max);

		var t = gains[gains.length - 1];
		gains.push(t);
		gains.push(t);
		gains.unshift(gains[0]);

		for (var a = 0; a < r.cfg.length && min != max; a++) {
			var fi = actx.createBiquadFilter(), c = r.cfg[a];
			fi.frequency.value = c[0];
			fi.gain.value = c[2] * gains[a];
			fi.Q.value = c[1];
			fi.type = a == 0 ? 'lowshelf' : a == r.cfg.length - 1 ? 'highshelf' : 'peaking';
			r.filters.push(fi);
		}

		// pregain, keep first in chain
		fi = actx.createGain();
		fi.gain.value = r.amp + 0.94;  // +.137 dB measured; now -.25 dB and almost bitperfect
		r.filters.push(fi);

		// wait nevermind, drc goes first
		timer.rm(showdrc);
		if (r.drcen) {
			fi = r.drcn = actx.createDynamicsCompressor();
			for (var a = 0; a < r.drcv.length; a++)
				fi[r.drck[a]].value = r.drcv[a];

			if (r.drcv[3] < 0.02) {
				// avoid static at decode start
				fi.attack.value = 0.02;
				setTimeout(function () {
					try {
						fi.attack.value = r.drcv[3];
					}
					catch (ex) { }
				}, 200);
			}

			r.filters.push(fi);
			timer.add(showdrc);
		}

		if (Math.round(r.chw * 25) != 25) {
			var split = actx.createChannelSplitter(2),
				merge = actx.createChannelMerger(2),
				lg1 = actx.createGain(),
				lg2 = actx.createGain(),
				rg1 = actx.createGain(),
				rg2 = actx.createGain(),
				vg1 = 1 - (1 - r.chw) / 2,
				vg2 = 1 - vg1;

			console.log('chw', vg1, vg2);

			merge.connect(r.filters[r.filters.length - 1]);
			lg1.gain.value = rg2.gain.value = vg1;
			lg2.gain.value = rg1.gain.value = vg2;
			lg1.connect(merge, 0, 0);
			rg1.connect(merge, 0, 0);
			lg2.connect(merge, 0, 1);
			rg2.connect(merge, 0, 1);

			split.connect(lg1, 0);
			split.connect(lg2, 0);
			split.connect(rg1, 1);
			split.connect(rg2, 1);
			r.filterskip.push(r.filters.length);
			r.filters.push(split);
			mp.acs.channelCountMode = 'explicit';
		}
	}

	function eq_step(e) {
		ev(e);
		var sb = this.getAttribute('band'),
			band = parseInt(sb),
			step = parseFloat(this.getAttribute('step'));

		if (sb == 'amp')
			r.amp = Math.round((r.amp + step * 0.2) * 100) / 100;
		else if (sb == 'chw')
			r.chw = Math.round((r.chw + step * 0.2) * 100) / 100;
		else
			r.gains[band] += step;

		r.apply();
	}

	function adj_band(that, step) {
		var err = false;
		try {
			var sb = that.getAttribute('band'),
				band = parseInt(sb),
				vs = that.value,
				v = parseFloat(vs);

			if (!isNum(v) || v + '' != vs)
				throw new Error('inval band');

			if (sb == 'amp')
				r.amp = Math.round((v + step * 0.2) * 100) / 100;
			else if (sb == 'chw')
				r.chw = Math.round((v + step * 0.2) * 100) / 100;
			else
				r.gains[band] = v + step;

			r.apply();
		}
		catch (ex) {
			err = true;
		}
		clmod(that, 'err', err);
	}

	function adj_drc() {
		var err = false;
		try {
			var n = this.getAttribute('k'),
				ov = r.drcv[n],
				vs = this.value,
				v = parseFloat(vs);

			if (!isNum(v) || v + '' != vs)
				throw new Error('inval v');

			if (v == ov)
				return;

			r.drcv[n] = v;
			jwrite('au_drcv', r.drcv);
			if (r.drcn)
				r.drcn[r.drck[n]].value = v;
		}
		catch (ex) {
			err = true;
		}
		clmod(this, 'err', err);
	}

	function eq_mod(e) {
		ev(e);
		adj_band(this, 0);
	}

	function eq_keydown(e) {
		var step = e.key == 'ArrowUp' ? 0.25 : e.key == 'ArrowDown' ? -0.25 : 0;
		if (step != 0)
			adj_band(this, step);
	}

	function showdrc() {
		if (!r.drcn)
			return timer.rm(showdrc);

		ebi('h_drc').textContent = f2f(r.drcn.reduction, 1);
	}

	var html = ['<table><tr><td rowspan="4">',
		'<a id="au_eq" class="tgl btn" href="#" tt="' + L.mt_eq + '">' + L.enable + '</a></td>'],
		h2 = [], h3 = [], h4 = [];

	var vs = [];
	for (var a = 0; a < r.bands.length; a++) {
		var hz = r.bands[a];
		if (hz >= 1000)
			hz = (hz / 1000) + 'k';

		hz = (hz + '').split('.')[0];
		vs.push([a, hz, r.gains[a]]);
	}
	vs.push(["amp", "boost", r.amp]);
	vs.push(["chw", "width", r.chw]);

	for (var a = 0; a < vs.length; a++) {
		var b = vs[a][0];
		html.push('<td><a href="#" class="eq_step" step="0.5" band="' + b + '">+</a></td>');
		h2.push('<td>' + vs[a][1] + '</td>');
		h4.push('<td><a href="#" class="eq_step" step="-0.5" band="' + b + '">&ndash;</a></td>');
		h3.push('<td><input type="text" class="eq_gain" ' + NOAC + ' band="' + b + '" value="' + vs[a][2] + '" /></td>');
	}
	html = html.join('\n') + '</tr><tr>';
	html += h2.join('\n') + '</tr><tr>';
	html += h3.join('\n') + '</tr><tr>';
	html += h4.join('\n') + '</tr><table>';
	ebi('audio_eq').innerHTML = html;

	h2 = [];
	html = ['<table><tr><td rowspan="2">',
		'<a id="au_drc" class="tgl btn" href="#" tt="' + L.mt_drc + '">' + L.enable + '</a></td>'];

	for (var a = 0; a < r.drch.length; a++) {
		html.push('<td>' + r.drch[a] + '</td>');
		h2.push('<td><input type="text" class="drc_v" ' + NOAC + ' k="' + a + '" value="' + r.drcv[a] + '" /></td>');
	}
	html = html.join('\n') + '</tr><tr>';
	html += h2.join('\n') + '</tr><table>';
	ebi('audio_drc').innerHTML = html;

	var stp = QSA('a.eq_step');
	for (var a = 0, aa = stp.length; a < aa; a++)
		stp[a].onclick = eq_step;

	var txt = QSA('input.eq_gain');
	for (var a = 0; a < txt.length; a++) {
		txt[a].oninput = eq_mod;
		txt[a].onkeydown = eq_keydown;
	}
	txt = QSA('input.drc_v');
	for (var a = 0; a < txt.length; a++)
		txt[a].oninput = txt[a].onkeydown = adj_drc;

	bcfg_bind(r, 'eqen', 'au_eq', false, r.apply);
	bcfg_bind(r, 'drcen', 'au_drc', false, r.apply);

	r.draw();
	return r;
})();


// plays the tid'th audio file on the page
function play(tid, is_ev, seek) {
	clearTimeout(mpl.t_eplay);
	if (mp.order.length == 0)
		return console.log('no audio found wait what');

	if (crashed)
		return;

	mpl.preload_url = null;
	mp.nopause();
	mp.stopfade(true);

	var tn = tid;
	if ((tn + '').indexOf('f-') === 0) {
		tn = mp.order.indexOf(tn);
		if (tn < 0)
			return toast.warn(10, L.mm_hnf);
	}

	if (tn >= mp.order.length) {
		if (mpl.pb_mode == 'loop' || ebi('unsearch')) {
			tn = 0;
		}
		else if (mpl.pb_mode == 'next') {
			treectl.ls_cb = next_song;
			return tree_neigh(1);
		}
	}

	if (tn < 0) {
		if (mpl.pb_mode == 'loop') {
			tn = mp.order.length - 1;
		}
		else if (mpl.pb_mode == 'next') {
			treectl.ls_cb = last_song;
			return tree_neigh(-1);
		}
	}

	tid = mp.order[tn];

	if (mp.au) {
		mp.au.pause();
		var el = ebi('a' + mp.au.tid);
		if (el)
			clmod(el, 'act');
	}
	else {
		mp.au = new Audio();
		mp.au2 = new Audio();
		mp.au.onerror = evau_error;
		mp.au.onprogress = pbar.drawpos;
		mp.au.onplaying = mpui.progress_updater;
		mp.au.onended = next_song;
		widget.open();
	}
	mp.init_fau();

	var url = addq(mpl.acode(mp.tracks[tid]), 'cache=987&_=' + ACB);

	if (mp.au.rsrc == url)
		mp.au.currentTime = 0;
	else if (mp.au2.rsrc == url) {
		var t = mp.au;
		mp.au = mp.au2;
		mp.au2 = t;
		t.onerror = t.onprogress = t.onended = null;
		mp.au.onerror = evau_error;
		mp.au.onprogress = pbar.drawpos;
		mp.au.onplaying = mpui.progress_updater;
		mp.au.onended = next_song;
		t = mp.au.currentTime;
		if (isNum(t) && t > 0.1)
			mp.au.currentTime = 0;
	}
	else
		mp.au.src = mp.au.rsrc = url;

	mp.au.osrc = mp.tracks[tid];
	afilt.apply();

	setTimeout(function () {
		mpl.unbuffer(url);
	}, 500);

	mp.au.ded = 0;
	mp.au.tid = tid;
	mp.au.pt0 = Date.now();
	mp.au.evp = get_evpath();
	mp.au.volume = mp.expvol(mp.vol);
	var trs = QSA('#files tr.play');
	for (var a = 0, aa = trs.length; a < aa; a++)
		clmod(trs[a], 'play');

	var oid = 'a' + tid;
	clmod(ebi(oid), 'act', 1);
	clmod(ebi(oid).closest('tr'), 'play', 1);
	clmod(ebi('wtoggle'), 'np', mpl.clip);
	if (thegrid)
		thegrid.loadsel();

	if (mpl.follow)
		scroll2playing();

	try {
		mp.nopause();
		if (mpl.aplay || is_ev !== -1)
			mp.au.play();

		if (mp.au.paused)
			autoplay_blocked(seek);
		else if (seek) {
			seek_au_sec(seek);
		}

		if (!seek && !ebi('unsearch')) {
			var o = ebi(oid);
			o.setAttribute('id', 'thx_js');
			if (mpl.aplay)
				sethash(oid);
			o.setAttribute('id', oid);
		}

		pbar.unwave();
		if (mpl.waves)
			pbar.loadwaves(url.replace(/\bth=(opus|mp3)&/, '') + '&th=p');

		mpui.progress_updater();
		pbar.onresize();
		vbar.onresize();
		mpl.announce();
		return true;
	}
	catch (ex) {
		toast.err(0, esc(L.mm_playerr + basenames(ex)));
	}
	clmod(ebi(oid), 'act');
	mpl.t_eplay = setTimeout(next_song, 5000);
}


function scroll2playing() {
	try {
		QS((!thegrid || !thegrid.en) ?
			'tr.play' : '#ggrid a.play').scrollIntoView();
	}
	catch (ex) { }
}


// event from the audio object if something breaks
function evau_error(e) {
	var err = '',
		eplaya = (e && e.target) || (window.event && window.event.srcElement);

	eplaya.ded = 1;

	switch (eplaya.error.code) {
		case eplaya.error.MEDIA_ERR_ABORTED:
			err = L.mm_eabrt;
			break;
		case eplaya.error.MEDIA_ERR_NETWORK:
			err = L.mm_enet;
			break;
		case eplaya.error.MEDIA_ERR_DECODE:
			err = L.mm_edec;
			break;
		case eplaya.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
			err = L.mm_esupp;
			if (/\.(aac|m4a)(\?|$)/i.exec(eplaya.rsrc) && !mpl.ac_aac) {
				try {
					ebi('ac_aac').click();
					QS('a.play.act').click();
					toast.warn(10, L.mm_opusen);
					return;
				}
				catch (ex) { }
			}
			break;
		default:
			err = L.mm_eunk;
			break;
	}
	var em = '' + eplaya.error.message,
		mfile = '\n\nFile: «' + uricom_dec(eplaya.src.split('/').pop()) + '»',
		e404 = L.mm_e404,
		e403 = L.mm_e403;

	if (em)
		err += '\n\n' + em;

	if (em.startsWith('403: '))
		err = e403;

	if (em.startsWith('404: '))
		err = e404;

	toast.warn(15, esc(basenames(err + mfile)));
	console.log(basenames(err + mfile));

	if (em.startsWith('MEDIA_ELEMENT_ERROR:')) {
		// chromish for 40x
		var xhr = new XHR();
		xhr.open('HEAD', eplaya.src, true);
		xhr.onload = xhr.onerror = function () {
			if (this.status < 400)
				return;

			err = this.status == 403 ? e403 : this.status == 404 ? e404 :
				L.mm_e5xx + this.status;

			toast.warn(15, esc(basenames(err + mfile)));
		};
		xhr.send();
		return;
	}

	mpl.t_eplay = setTimeout(next_song, 15000);
}


// show ui to manually start playback of a linked song
function autoplay_blocked(seek) {
	var tid = mp.au.tid,
		fn = mp.tracks[tid].split(/\//).pop();

	fn = uricom_dec(fn.replace(/\+/g, ' ').split('?')[0]);

	modal.confirm('<h6>' + L.mm_hashplay + '</h6>\n«' + esc(fn) + '»', function () {
		// chrome 91 may permanently taint on a failed play()
		// depending on win10 settings or something? idk
		mp.au = mpo.au = null;

		play(tid, true, seek);
		mp.fade_in();
	}, function () {
		sethash('');
		clmod(QS('#files tr.play'), 'play');
		return reload_mp();
	});
}


function scan_hash(v) {
	if (!v)
		return null;

	var m = /^#([ag])(f-[0-9a-f]{8,16})(&.+)?/.exec(v + '');
	if (!m)
		return null;

	var mtype = m[1],
		id = m[2],
		ts = null;

	if (m.length > 3) {
		var tm = /^&[Tt=0]*([0-9]+[Mm:])?0*([0-9\.]+)[Ss]?$/.exec(m[3]);
		if (tm) {
			ts = parseInt(tm[1] || 0) * 60 + parseFloat(tm[2] || 0);
		}
		tm = /^&[Tt=0]*([0-9\.]+)-([0-9\.]+)$/.exec(m[3]);
		if (tm) {
			ts = '' + tm[1] + '-' + tm[2];
		}
	}

	return [mtype, id, ts];
}


function eval_hash() {
	document.onkeydown = ahotkeys;
	window.onpopstate = treectl.onpopfun;

	if (hash0 && window.og_fn) {
		var all = msel.getall(), mi;
		for (var a = 0; a < all.length; a++)
			if (og_fn == uricom_dec(vsplit(all[a].vp)[1].split('?')[0])) {
				mi = all[a];
				break;
			}

		var ch = !mi ? '' :
			img_re.exec(og_fn) ? 'g' :
			ebi('a' + mi.id) ? 'a' :
			'';

		hash0 = ch ? ('#' + ch + mi.id) : '';
	}

	var v = hash0;
	hash0 = null;
	if (!v)
		return;

	var media = scan_hash(v);
	if (media) {
		var mtype = media[0],
			id = media[1],
			ts = media[2];

		if (mtype == 'a') {
			if (!ts)
				return play(id, -1);

			return play(id, -1, ts);
		}

		if (mtype == 'g') {
			if (!thegrid.en)
				ebi('griden').click();

			var t = setInterval(function () {
				if (!thegrid.bbox)
					return;

				clearInterval(t);
				baguetteBox.urltime(ts);
				var im = QS('#ggrid a[ref="' + id + '"]');
				if (!im)
					return toast.warn(10, L.im_hnf);

				im.click();
				im.scrollIntoView();
			}, 50);
		}
	}

	if (v.startsWith('#q=')) {
		goto('search');
		var i = ebi('q_raw');
		i.value = uricom_dec(v.slice(3));
		return i.onkeydown({ 'key': 'Enter' });
	}

	if (v.startsWith('#v=')) {
		goto(v.slice(3));
		return;
	}
}


(function () {
	var props = {};

	// a11y jump-to-content
	for (var a = 0; a < 2; a++)
		(function (a) {
			var d = mknod('a');
			d.setAttribute('href', '#');
			d.setAttribute('class', 'ayjump');
			d.innerHTML = a ? L.ay_path : L.ay_files;
			document.body.insertBefore(d, ebi('ops'));
			d.onclick = function (e) {
				ev(e);
				if (a)
					QS(treectl.hidden ? '#path a:nth-last-child(2)' : '#treeul a.hl').focus();
				else
					QS(thegrid.en ? '#ggrid a' : '#files tbody tr[tabindex]').focus();
			};
		})(a);

	// account-info label
	var d = mknod('div', 'acc_info');
	document.body.insertBefore(d, ebi('ops'));

	// folder nav
	ebi('goh').parentElement.appendChild(mknod('span', null,
		'<a href="#" id="gop" tt="' + L.gop + '</a>/<a href="#" id="gou" tt="' + L.gou + '</a>/<a href="#" id="gon" tt="' + L.gon + '</a>'));
	ebi('gop').onclick = function () { tree_neigh(-1); }
	ebi('gon').onclick = function () { tree_neigh(1); }
	ebi('gou').onclick = function () { tree_up(true); }

	// show/hide scrollbars
	function setsb() {
		clmod(document.documentElement, 'noscroll', !props.sbars);
	}
	bcfg_bind(props, 'sbars', 'sbars', true, setsb);
	setsb();

	// compact media player
	function setacmp() {
		clmod(ebi('widget'), 'cmp', props.mcmp);
		pbar.onresize();
		vbar.onresize();
	}
	bcfg_bind(props, 'mcmp', 'au_compact', false, setacmp);
	setacmp();
})();


function read_dsort(txt) {
	try {
		var zt = (('' + txt).trim() || 'href').split(/,+/g);
		dsort = [];
		for (var a = 0; a < zt.length; a++) {
			var z = zt[a].trim(), n = 1, t = "";
			if (z.startsWith("-")) {
				z = z.slice(1);
				n = -1;
			}
			if (z == "sz" || z.indexOf('/.') + 1)
				t = "int";

			dsort.push([z, n, t]);
		}
	}
	catch (ex) {
		toast.warn(10, 'failed to apply default sort order [' + txt + ']:\n' + ex);
		dsort = [['href', 1, '']];
	}
}
read_dsort(dsort);


function sortfiles(nodes) {
	if (!nodes.length)
		return nodes;

	var sopts = jread('fsort', jcp(dsort)),
		dir1st = sread('dir1st') !== '0';

	try {
		var is_srch = false;
		if (nodes[0]['rp']) {
			is_srch = true;
			for (var b = 0, bb = nodes.length; b < bb; b++)
				nodes[b].ext = nodes[b].rp.split('.').pop();
			for (var b = 0; b < sopts.length; b++)
				if (sopts[b][0] == 'href')
					sopts[b][0] = 'rp';
		}
		for (var a = sopts.length - 1; a >= 0; a--) {
			var name = sopts[a][0], rev = sopts[a][1], typ = sopts[a][2];
			if (!name)
				continue;

			if (name == 'ts')
				typ = 'int';

			if (name.indexOf('tags/') === 0) {
				name = name.slice(5);
				for (var b = 0, bb = nodes.length; b < bb; b++)
					nodes[b]._sv = nodes[b].tags[name];
			}
			else {
				for (var b = 0, bb = nodes.length; b < bb; b++) {
					var v = nodes[b][name];

					if ((v + '').indexOf('<a ') === 0)
						v = v.split('>')[1];
					else if (name == "href" && v)
						v = uricom_dec(v);

					nodes[b]._sv = v
				}
			}

			var onodes = nodes.map(function (x) { return x; });
			nodes.sort(function (n1, n2) {
				var v1 = n1._sv,
					v2 = n2._sv;

				if (v1 === undefined) {
					if (v2 === undefined) {
						return onodes.indexOf(n1) - onodes.indexOf(n2);
					}
					return -1 * rev;
				}
				if (v2 === undefined) return 1 * rev;

				var ret = rev * (typ == 'int' ? (v1 - v2) : (v1.localeCompare(v2)));
				if (ret === 0)
					ret = onodes.indexOf(n1) - onodes.indexOf(n2);

				return ret;
			});
		}
		for (var b = 0, bb = nodes.length; b < bb; b++) {
			delete nodes[b]._sv;
			if (is_srch)
				delete nodes[b].ext;
		}
		if (dir1st) {
			var r1 = [], r2 = [];
			for (var b = 0, bb = nodes.length; b < bb; b++)
				(nodes[b].href.split('?')[0].slice(-1) == '/' ? r1 : r2).push(nodes[b]);

			nodes = r1.concat(r2);
		}
	}
	catch (ex) {
		console.log("failed to apply sort config: " + ex);
		console.log("resetting fsort " + sread('fsort'));
		sdrop('fsort');
	}
	return nodes;
}


function fmt_ren(re, md, fmt) {
	var ptr = 0;
	function dive(stop_ch) {
		var ret = '', ng = 0;
		while (ptr < fmt.length) {
			var dbg = fmt.slice(ptr),
				ch = fmt[ptr++];

			if (ch == '\\') {
				ret += fmt[ptr++];
				continue;
			}

			if (ch == ')' || ch == ']' || ch == stop_ch)
				return [ng, ret];

			if (ch == '[') {
				var r2 = dive();
				if (r2[0] == 0)
					ret += r2[1];
			}
			else if (ch == '(') {
				var end = fmt.indexOf(')', ptr);
				if (end < 0)
					throw 'the ( was never closed: ' + fmt.slice(0, ptr);

				var arg = fmt.slice(ptr, end), v = null;
				ptr = end + 1;

				if (arg != parseInt(arg))
					v = md[arg];
				else {
					arg = parseInt(arg);
					if (arg >= re.length)
						throw 'matching group ' + arg + ' exceeds ' + (re.length - 0);

					v = re[arg];
				}

				if (v !== null && v !== undefined)
					ret += v;
				else
					ng++;
			}
			else if (ch == '$') {
				ch = fmt[ptr++];
				var end = fmt.indexOf('(', ptr);
				if (end < 0)
					throw 'no function name after the $ here: ' + fmt.slice(0, ptr);

				var fun = fmt.slice(ptr - 1, end);
				ptr = end + 1;

				if (fun == "lpad") {
					var str = dive(',')[1];
					var len = dive(',')[1];
					var chr = dive()[1];
					if (!len || !chr)
						throw 'invalid arguments to ' + fun;

					if (!str.length)
						ng += 1;

					while (str.length < len)
						str = chr + str;

					ret += str;
				}
				else if (fun == "rpad") {
					var str = dive(',')[1];
					var len = dive(',')[1];
					var chr = dive()[1];
					if (!len || !chr)
						throw 'invalid arguments to ' + fun;

					if (!str.length)
						ng += 1;

					while (str.length < len)
						str += chr;

					ret += str;
				}
				else throw 'function not implemented: "' + fun + '"';
			}
			else ret += ch;
		}
		return [ng, ret];
	}
	try {
		return [true, dive()[1]];
	}
	catch (ex) {
		return [false, ex];
	}
}


var fileman = (function () {
	var bren = ebi('fren'),
		bdel = ebi('fdel'),
		bcut = ebi('fcut'),
		bpst = ebi('fpst'),
		bshr = ebi('fshr'),
		t_paste,
		r = {};

	r.clip = null;
	try {
		r.bus = new BroadcastChannel("fileman_bus");
	}
	catch (ex) { }

	r.render = function () {
		if (r.clip === null)
			r.clip = jread('fman_clip', []).slice(1);

		var sel = msel.getsel(),
			nsel = sel.length,
			enren = nsel,
			endel = nsel,
			encut = nsel,
			enpst = r.clip && r.clip.length,
			hren = !(have_mv && has(perms, 'write') && has(perms, 'move')),
			hdel = !(have_del && has(perms, 'delete')),
			hcut = !(have_mv && has(perms, 'move')),
			hpst = !(have_mv && has(perms, 'write')),
			hshr = !(have_shr && acct != '*' && (has(perms, 'read') || has(perms, 'write')));

		if (!(enren || endel || encut || enpst))
			hren = hdel = hcut = hpst = true;

		clmod(bren, 'en', enren);
		clmod(bdel, 'en', endel);
		clmod(bcut, 'en', encut);
		clmod(bpst, 'en', enpst);
		clmod(bshr, 'en', 1);

		clmod(bren, 'hide', hren);
		clmod(bdel, 'hide', hdel);
		clmod(bcut, 'hide', hcut);
		clmod(bpst, 'hide', hpst);
		clmod(bshr, 'hide', hshr);

		clmod(ebi('wfm'), 'act', QS('#wfm a.en:not(.hide)'));

		var wfs = ebi('wfs'), h = '';
		try {
			wfs.innerHTML = h = r.fsi(sel);
		}
		catch (ex) { }
		clmod(wfs, 'act', h);

		bpst.setAttribute('tt', L.ft_paste.format(r.clip.length));
		bshr.setAttribute('tt', nsel ? L.fs_ss : L.fs_sc);
	};

	r.fsi = function (sel) {
		if (!sel.length)
			return '';

		var lf = treectl.lsc.files,
			nf = 0,
			sz = 0,
			dur = 0,
			ntab = new Set();

		for (var a = 0; a < sel.length; a++)
			ntab.add(sel[a].vp.split('/').pop());

		for (var a = 0; a < lf.length; a++) {
			if (!ntab.has(lf[a].href.split('?')[0]))
				continue;

			var f = lf[a];
			nf++;
			sz += f.sz;
			if (f.tags && f.tags['.dur'])
				dur += f.tags['.dur']
		}

		if (!nf)
			return '';

		var ret = '{0}<br />{1}<small>F</small>'.format(humansize(sz), nf);

		if (dur)
			ret += ' ' + s2ms(dur);

		return ret;
	};

	r.share = function (e) {
		ev(e);

		var vp = uricom_dec(get_evpath()),
			sel = msel.getsel(),
			fns = [];

		for (var a = 0; a < sel.length; a++)
			fns.push(uricom_dec(noq_href(ebi(sel[a].id))));

		if (fns.length == 1 && fns[0].endsWith('/'))
			vp = fns.pop();

		for (var a = 0; a < fns.length; a++)
			if (fns[a].endsWith('/'))
				return toast.err(10, L.fs_just1d);

		var shui = ebi('shui');
		if (!shui) {
			shui = mknod('div', 'shui');
			document.body.appendChild(shui);
		}
		shui.style.display = 'block';

		var html = [
			'<div>',
			'<table>',
			'<tr><td colspan="2">',
			'<button id="sh_abrt">' + L.fs_abrt + '</button>',
			'<button id="sh_rand">' + L.fs_rand + '</button>',
			'<button id="sh_apply">' + L.fs_go + '</button>',
			'</td></tr>',
			'<tr><td>' + L.fs_name + '</td><td><input type="text" id="sh_k" ' + NOAC + ' placeholder="  ' + L.fs_pname + '" /></td></tr>',
			'<tr><td>' + L.fs_src + '</td><td><input type="text" id="sh_vp" ' + NOAC + ' readonly tt="' + L.fs_tsrc + '" /></td></tr>',
			'<tr><td>' + L.fs_pwd + '</td><td><input type="text" id="sh_pw" ' + NOAC + ' placeholder="  ' + L.fs_ppwd + '" /></td></tr>',
			'<tr><td>' + L.fs_exp + '</td><td class="exs">',
			'<input type="text" id="sh_exm" ' + NOAC + ' /> ' + L.fs_tmin + ' / ',
			'<input type="text" id="sh_exh" ' + NOAC + ' /> ' + L.fs_thrs + ' / ',
			'<input type="text" id="sh_exd" ' + NOAC + ' /> ' + L.fs_tdays + ' / ',
			'<button id="sh_noex">' + L.fs_never + '</button>',
			'</td></tr>',
			'<tr><td>perms</td><td class="sh_axs">',
		];
		for (var a = 0; a < perms.length; a++)
			if (perms[a] != 'admin')
				html.push('<a href="#" class="tgl btn">' + perms[a] + '</a>');

		html.push('</td></tr></div');
		shui.innerHTML = html.join('\n');

		var sh_rand = ebi('sh_rand'),
			sh_abrt = ebi('sh_abrt'),
			sh_apply = ebi('sh_apply'),
			sh_noex = ebi('sh_noex'),
			exm = ebi('sh_exm'),
			exh = ebi('sh_exh'),
			exd = ebi('sh_exd'),
			sh_k = ebi('sh_k'),
			sh_vp = ebi('sh_vp'),
			sh_pw = ebi('sh_pw');

		function setexp(a, b) {
			a = parseFloat(a);
			if (!isNum(a))
				return;

			var v = a * b;
			swrite('fsh_exp', v);

			if (exm.value != v) exm.value = Math.round(v * 10) / 10; v /= 60;
			if (exh.value != v) exh.value = Math.round(v * 10) / 10; v /= 24;
			if (exd.value != v) exd.value = Math.round(v * 10) / 10;
		}
		function setdef() {
			setexp(icfg_get('fsh_exp', 60 * 24), 1);
		}
		setdef();

		exm.oninput = function () { setexp(this.value, 1); };
		exh.oninput = function () { setexp(this.value, 60); };
		exd.oninput = function () { setexp(this.value, 60 * 24); };
		exm.onfocus = exh.onfocus = exd.onfocus = function () {
			this.value = '';
		};
		sh_noex.onclick = function () {
			setexp(0, 1);
		};
		exm.onblur = exh.onblur = exd.onblur = setdef;

		exm.onkeydown = exh.onkeydown = exd.onkeydown =
		sh_k.onkeydown = sh_pw.onkeydown = function (e) {
			var kc = (e.code || e.key) + '';
			if (kc.endsWith('Enter'))
				sh_apply.click();
		};

		sh_abrt.onclick = function () {
			shui.parentNode.removeChild(shui);
		};
		sh_rand.onclick = function () {
			sh_k.value = randstr(12).replace(/l/g, 'n');
		};
		tt.att(shui);

		var pbtns = QSA('#shui .sh_axs a');
		for (var a = 0; a < pbtns.length; a++)
			pbtns[a].onclick = shspf;

		function shspf() {
			clmod(this, 'on', 't');
		}
		clmod(pbtns[0], 'on', 1);

		var vpt = vp;
		if (fns.length) {
			vpt = fns.length + ' files in ' + vp + '  '
			for (var a = 0; a < fns.length; a++)
				vpt += '「' + fns[a].split('/').pop() + '」';
		}
		sh_vp.value = vpt;

		sh_k.oninput = function (e) {
			var v = this.value,
				v2 = v.replace(/[^0-9a-zA-Z-]/g, '_');

			if (v != v2)
				this.value = v2;
		};

		function shr_cb() {
			toast.hide();
			var surl = this.responseText;
			if (this.status !== 201 || !/^created share:/.exec(surl)) {
				shui.style.display = 'block';
				var msg = unpre(surl);
				toast.err(9, msg);
				return;
			}
			surl = surl.slice(15);
			modal.confirm(L.fs_ok + esc(surl), function() {
				cliptxt(surl, function () {
					toast.ok(2, L.clipped);
				});
			});
		}

		sh_apply.onclick = function () {
			if (!sh_k.value)
				sh_rand.click();

			var plist = [];
			for (var a = 0; a < pbtns.length; a++)
				if (clgot(pbtns[a], 'on'))
					plist.push(pbtns[a].textContent);

			shui.style.display = 'none';
			toast.inf(30, L.fs_w8);

			var body = {
				"k": sh_k.value,
				"vp": fns.length ? fns : [sh_vp.value],
				"pw": sh_pw.value,
				"exp": exm.value,
				"perms": plist,
			};
			var xhr = new XHR();
			xhr.open('POST', SR + '/?share', true);
			xhr.setRequestHeader('Content-Type', 'text/plain');
			xhr.onload = xhr.onerror = shr_cb;
			xhr.send(JSON.stringify(body));
		};

		setTimeout(sh_pw.focus.bind(sh_pw), 1);
	};

	r.rename = function (e) {
		ev(e);
		if (clgot(bren, 'hide'))
			return toast.err(3, L.fr_eperm);

		var sel = msel.getsel();
		if (!sel.length)
			return toast.err(3, L.fr_emore);

		var f = [],
			base = vsplit(sel[0].vp)[0],
			mkeys;

		for (var a = 0; a < sel.length; a++) {
			var vp = sel[a].vp;
			if (vp.endsWith('/'))
				vp = vp.slice(0, -1);

			var vsp = vsplit(vp);
			if (base != vsp[0])
				return toast.err(0, esc('bug:\n' + base + '\n' + vsp[0]));

			var vars = ft2dict(ebi(sel[a].id).closest('tr'));
			mkeys = vars[1].concat(vars[2]);

			var md = vars[0];
			for (var k in md) {
				if (!md.hasOwnProperty(k))
					continue;

				md[k] = (md[k] + '').replace(/[\/\\]/g, '-');

				if (k.startsWith('.'))
					md[k.slice(1)] = md[k];
			}
			md.t = md.ext;
			md.date = md.ts;
			md.size = md.sz;

			f.push({
				"src": vp,
				"ofn": uricom_dec(vsp[1]),
				"md": vars[0],
				"ok": true
			});
		}

		var rui = ebi('rui');
		if (!rui) {
			rui = mknod('div', 'rui');
			document.body.appendChild(rui);
		}

		var html = sel.length > 1 ? ['<div>'] : [
			'<div>',
			'<button class="rn_dec" n="0" tt="' + L.frt_dec + '</button>',
			'//',
			'<button class="rn_reset" n="0" tt="' + L.frt_rst + '</button>'
		];

		html = html.concat([
			'<button id="rn_cancel" tt="' + L.frt_abrt + '</button>',
			'<button id="rn_apply">✅ ' + L.frb_apply + '</button>',
			'<a id="rn_adv" class="tgl btn" href="#" tt="' + L.fr_adv + '</a>',
			'<a id="rn_case" class="tgl btn" href="#" tt="' + L.fr_case + '</a>',
			'<a id="rn_win" class="tgl btn" href="#" tt="' + L.fr_win + '</a>',
			'<a id="rn_slash" class="tgl btn" href="#" tt="' + L.fr_slash + '</a>',
			'</div>',
			'<div id="rn_vadv"><table>',
			'<tr><td>regex</td><td><input type="text" id="rn_re" ' + NOAC + ' tt="' + L.fr_re + '" placeholder="^[0-9]+[\\. ]+(.*) - (.*)" /></td></tr>',
			'<tr><td>format</td><td><input type="text" id="rn_fmt" ' + NOAC + ' tt="' + L.fr_fmt + '" placeholder="[(artist) - ](title).(ext)" /></td></tr>',
			'<tr><td>preset</td><td><select id="rn_pre"></select>',
			'<button id="rn_pdel">❌ ' + L.fr_pdel + '</button>',
			'<button id="rn_pnew">💾 ' + L.fr_pnew + '</button>',
			'</td></tr>',
			'</table></div>'
		]);

		var cheap = f.length > 500,
			t_rst = L.frt_rst.split('>').pop();

		if (sel.length == 1)
			html.push(
				'<div><table id="rn_f">\n' +
				'<tr><td>old:</td><td><input type="text" id="rn_old" n="0" readonly /></td></tr>\n' +
				'<tr><td>new:</td><td><input type="text" id="rn_new" n="0" /></td></tr>');
		else {
			html.push(
				'<div><table id="rn_f" class="m">' +
				'<tr><td></td><td>' + L.fr_lnew + '</td><td>' + L.fr_lold + '</td></tr>');
			for (var a = 0; a < f.length; a++)
				html.push(
					'<tr><td>' +
					(cheap ? '</td>' :
						'<button class="rn_dec" n="' + a + '">decode</button>' +
						'<button class="rn_reset" n="' + a + '">' + t_rst + '</button></td>') +
					'<td><input type="text" id="rn_new" n="' + a + '" /></td>' +
					'<td><input type="text" id="rn_old" n="' + a + '" readonly /></td></tr>');
		}
		html.push('</table></div>');

		if (sel.length == 1) {
			html.push('<div><p style="margin:.6em 0">' + L.fr_tags + '</p><table>');
			for (var a = 0; a < mkeys.length; a++)
				html.push('<tr><td>' + esc(mkeys[a]) + '</td><td><input type="text" readonly value="' + esc(f[0].md[mkeys[a]]) + '" /></td></tr>');

			html.push('</table></div>');
		}

		rui.innerHTML = html.join('\n');
		for (var a = 0; a < f.length; a++) {
			var k = '[n="' + a + '"]';
			f[a].iold = QS('#rn_old' + k);
			f[a].inew = QS('#rn_new' + k);
			f[a].inew.value = f[a].iold.value = f[a].ofn;

			if (!cheap)
				(function (a) {
					f[a].inew.onkeydown = function (e) {
						rn_ok(a, true);
						var kc = (e.code || e.key) + '';
						if (kc.endsWith('Enter'))
							return rn_apply();
					};
					QS('.rn_dec' + k).onclick = function (e) {
						ev(e);
						f[a].inew.value = uricom_dec(f[a].inew.value);
					};
					QS('.rn_reset' + k).onclick = function (e) {
						ev(e);
						rn_reset(a);
					};
				})(a);
		}
		rn_reset(0);
		tt.att(rui);

		function sadv() {
			ebi('rn_vadv').style.display = ebi('rn_case').style.display = r.adv ? '' : 'none';
		}
		bcfg_bind(r, 'adv', 'rn_adv', false, sadv);
		bcfg_bind(r, 'cs', 'rn_case', false);
		bcfg_bind(r, 'win', 'rn_win', true);
		bcfg_bind(r, 'slash', 'rn_slash', true);
		sadv();

		function rn_ok(n, ok) {
			f[n].ok = ok;
			clmod(f[n].inew.closest('tr'), 'err', !ok);
		}

		function rn_reset(n) {
			f[n].inew.value = f[n].iold.value = f[n].ofn;
			f[n].inew.focus();
			f[n].inew.setSelectionRange(0, f[n].inew.value.lastIndexOf('.'), "forward");
		}
		function rn_cancel(e) {
			ev(e);
			rui.parentNode.removeChild(rui);
		}

		ebi('rn_cancel').onclick = rn_cancel;
		ebi('rn_apply').onclick = rn_apply;

		var ire = ebi('rn_re'),
			ifmt = ebi('rn_fmt'),
			ipre = ebi('rn_pre'),
			idel = ebi('rn_pdel'),
			inew = ebi('rn_pnew'),
			defp = '$lpad((tn),2,0). [(artist) - ](title).(ext)';

		var presets = {};
		presets[defp] = ['', defp];
		presets = jread("rn_pre", presets);

		function spresets() {
			var keys = Object.keys(presets), o;
			keys.sort();
			ipre.innerHTML = '<option value=""></option>';
			for (var a = 0; a < keys.length; a++) {
				o = mknod('option');
				o.setAttribute('value', keys[a]);
				o.textContent = keys[a];
				ipre.appendChild(o);
			}
		}
		inew.onclick = function (e) {
			ev(e);
			modal.prompt(L.fr_pname, ifmt.value, function (name) {
				if (!name)
					return toast.warn(3, L.fr_aborted);

				presets[name] = [ire.value, ifmt.value];
				jwrite('rn_pre', presets);
				spresets();
				ipre.value = name;
			});
		};
		idel.onclick = function (e) {
			ev(e);
			delete presets[ipre.value];
			jwrite('rn_pre', presets);
			spresets();
		};
		ipre.oninput = function () {
			var cfg = presets[ipre.value];
			if (cfg) {
				ire.value = cfg[0];
				ifmt.value = cfg[1];
			}
			ifmt.oninput();
		};
		spresets();

		ire.onkeydown = ifmt.onkeydown = function (e) {
			var k = (e.code || e.key) + '';

			if (k == 'Escape' || k == 'Esc')
				return rn_cancel();

			if (k.endsWith('Enter'))
				return rn_apply();
		};

		ire.oninput = ifmt.oninput = function (e) {
			var ptn = ire.value,
				fmt = ifmt.value,
				re = null;

			if (!fmt)
				return;

			try {
				if (ptn)
					re = new RegExp(ptn, r.cs ? 'i' : '');
			}
			catch (ex) {
				return toast.err(5, esc('invalid regex:\n' + ex));
			}
			toast.hide();

			for (var a = 0; a < f.length; a++) {
				var m = re ? re.exec(f[a].ofn) : null,
					ok, txt = '';

				if (re && !m) {
					txt = 'regex did not match';
					ok = false;
				}
				else {
					var ret = fmt_ren(m, f[a].md, fmt);
					ok = ret[0];
					txt = ret[1];
				}
				rn_ok(a, ok);
				f[a].inew.value = (ok ? '' : 'ERROR: ') + txt;
			}
		};

		function rn_apply(e) {
			ev(e);
			if (r.win || r.slash) {
				var changed = 0;
				for (var a = 0; a < f.length; a++) {
					var ov = f[a].inew.value,
						nv = namesan(ov, r.win, r.slash);

					if (ov != nv) {
						f[a].inew.value = nv;
						changed++;
					}
				}
				if (changed)
					return modal.confirm(L.fr_nchg.format(changed), rn_apply_loop, null);
			}
			rn_apply_loop();
		}

		function rn_apply_loop() {
			while (f.length && (!f[0].ok || f[0].ofn == f[0].inew.value))
				f.shift();

			if (!f.length) {
				toast.ok(2, 'rename OK');
				treectl.goto();
				return rn_cancel();
			}

			toast.show('inf r', 0, esc(L.fr_busy.format(f.length, f[0].ofn)));
			var dst = base + uricom_enc(f[0].inew.value, false);

			function rename_cb() {
				if (this.status !== 201) {
					var msg = unpre(this.responseText);
					toast.err(9, L.fr_efail + msg);
					return;
				}

				f.shift().inew.value = '( OK )';
				return rn_apply_loop();
			}

			var xhr = new XHR();
			xhr.open('POST', f[0].src + '?move=' + dst, true);
			xhr.onload = xhr.onerror = rename_cb;
			xhr.send();
		}
	};

	r.delete = function (e) {
		ev(e);
		if (clgot(bdel, 'hide'))
			return toast.err(3, L.fd_eperm);

		var sel = msel.getsel(),
			vps = [];

		for (var a = 0; a < sel.length; a++)
			vps.push(sel[a].vp);

		if (!sel.length)
			return toast.err(3, L.fd_emore);

		function deleter(err) {
			var xhr = new XHR(),
				vp = vps.shift();

			if (!vp) {
				if (err !== 'xbd')
					toast.ok(2, L.fd_ok);

				treectl.goto();
				return;
			}
			toast.show('inf r', 0, esc(L.fd_busy.format(vps.length + 1, vp)), 'r');

			xhr.open('POST', vp + '?delete', true);
			xhr.onload = xhr.onerror = delete_cb;
			xhr.send();
		}
		function delete_cb() {
			if (this.status !== 200) {
				var msg = unpre(this.responseText);
				toast.err(9, L.fd_err + msg);
				return;
			}
			if (this.responseText.indexOf('deleted 0 files (and 0') + 1) {
				toast.err(9, L.fd_none);
				return deleter('xbd');
			}
			deleter();
		}

		modal.confirm('<h6 style="color:#900">' + L.danger + '</h6>\n<b>' + L.fd_warn1.format(vps.length) + '</b><ul>' + uricom_adec(vps, true).join('') + '</ul>', function () {
			modal.confirm(L.fd_warn2, deleter, null);
		}, null);
	};

	r.cut = function (e) {
		ev(e);
		if (clgot(bcut, 'hide'))
			return toast.err(3, L.fc_eperm);

		var sel = msel.getsel(),
			vps = [];

		if (!sel.length)
			toast.err(3, L.fc_emore);

		var els = [], griden = thegrid.en;
		for (var a = 0; a < sel.length; a++) {
			vps.push(sel[a].vp);
			if (sel.length < 100)
				try {
					if (griden)
						els.push(QS('#ggrid>a[ref="' + sel[a].id + '"]'));
					else
						els.push(ebi(sel[a].id).closest('tr'));

					clmod(els[a], 'fcut');
				}
				catch (ex) { }
		}

		setTimeout(function () {
			try {
				for (var a = 0; a < els.length; a++)
					clmod(els[a], 'fcut', 1);
			}
			catch (ex) { }
		}, 1);

		try {
			var stamp = Date.now();
			vps = JSON.stringify([stamp].concat(vps));
			if (vps.length > 1024 * 1024)
				throw 'a';

			swrite('fman_clip', vps);
			r.tx(stamp);
			if (sel.length)
				toast.inf(1.5, L.fc_ok.format(sel.length));
		}
		catch (ex) {
			toast.warn(30, L.fc_warn.format(sel.length));
		}
	};

	document.onpaste = function (e) {
		var xfer = e.clipboardData || window.clipboardData;
		if (!xfer || !xfer.files || !xfer.files.length)
			return;

		var files = [];
		for (var a = 0, aa = xfer.files.length; a < aa; a++)
			files.push(xfer.files[a]);

		clearTimeout(t_paste);

		if (!r.clip.length)
			return r.clip_up(files);

		var src = r.clip.length == 1 ? r.clip[0] : vsplit(r.clip[0])[0],
			msg = L.fp_both_m.format(r.clip.length, src, files.length);

		modal.confirm(msg, r.paste, function () { r.clip_up(files); }, null, L.fp_both_b);
	};

	r.clip_up = function (files) {
		goto_up2k();
		var good = [], nil = [], bad = [];
		for (var a = 0, aa = files.length; a < aa; a++) {
			var fobj = files[a], dst = good;
			try {
				if (fobj.size < 1)
					dst = nil;
			}
			catch (ex) {
				dst = bad;
			}
			dst.push([fobj, fobj.name]);
		}
		var doit = function (is_img) {
			jwrite('fman_clip', [Date.now()]);
			r.clip = [];

			var x = up2k.uc.ask_up;
			if (is_img)
				up2k.uc.ask_up = false;

			up2k.gotallfiles[0](good, nil, bad, up2k.gotallfiles.slice(1));
			up2k.uc.ask_up = x;
		};
		if (good.length != 1)
			return doit();

		var fn = good[0][1],
			ofs = fn.lastIndexOf('.');

		// stop linux-chrome from adding the fs-path into the <input>
		setTimeout(function () {
			modal.prompt(L.fp_name, fn, function (v) {
				good[0][1] = v;
				doit(true);
			}, null, null, 0, ofs > 0 ? ofs : undefined);
		}, 1);
	};

	r.d_paste = function () {
		// gets called before onpaste; defer
		clearTimeout(t_paste);
		t_paste = setTimeout(r.paste, 50);
	};

	r.paste = function () {
		if (clgot(bpst, 'hide'))
			return toast.err(3, L.fp_eperm);

		if (!r.clip.length)
			return toast.err(5, L.fp_ecut);

		var req = [],
			exists = [],
			indir = [],
			srcdir = vsplit(r.clip[0])[0],
			links = QSA('#files tbody td:nth-child(2) a');

		for (var a = 0, aa = links.length; a < aa; a++)
			indir.push(vsplit(noq_href(links[a]))[1]);

		for (var a = 0; a < r.clip.length; a++) {
			var found = false;
			for (var b = 0; b < indir.length; b++) {
				if (r.clip[a].endsWith('/' + indir[b])) {
					exists.push(r.clip[a]);
					found = true;
				}
			}
			if (!found)
				req.push(r.clip[a]);
		}

		if (exists.length)
			toast.warn(30, L.fp_ename.format(exists.length) + '<ul>' + uricom_adec(exists, true).join('') + '</ul>');

		if (!req.length)
			return;

		function paster() {
			var xhr = new XHR(),
				vp = req.shift();

			if (!vp) {
				toast.ok(2, L.fp_ok);
				treectl.goto();
				r.tx(srcdir);
				return;
			}
			toast.show('inf r', 0, esc(L.fp_busy.format(req.length + 1, uricom_dec(vp))));

			var dst = get_evpath() + vp.split('/').pop();

			xhr.open('POST', vp + '?move=' + dst, true);
			xhr.onload = xhr.onerror = paste_cb;
			xhr.send();
		}
		function paste_cb() {
			if (this.status !== 201) {
				var msg = unpre(this.responseText);
				toast.err(9, L.fp_err + msg);
				return;
			}
			paster();
		}

		modal.confirm(L.fp_confirm.format(req.length) + '<ul>' + uricom_adec(req, true).join('') + '</ul>', function () {
			paster();
			jwrite('fman_clip', [Date.now()]);
		}, null);
	};

	function onmsg(msg) {
		r.clip = null;
		var n = parseInt('' + msg), tries = 0;
		var fun = function () {
			if (n == msg && n > 1 && r.clip === null) {
				var fc = jread('fman_clip', []);
				if (!fc || !fc.length || fc[0] != n) {
					if (++tries > 10)
						return modal.alert(L.fp_etab);

					return setTimeout(fun, 100);
				}
			}
			r.render();
			if (msg == get_evpath())
				treectl.goto(msg);
		};
		fun();
	}

	if (r.bus)
		r.bus.onmessage = function (e) {
			onmsg(e ? e.data : 1)
		};

	r.tx = function (msg) {
		if (!r.bus)
			return onmsg(msg);

		r.bus.postMessage(msg);
		r.bus.onmessage();
	};

	bren.onclick = r.rename;
	bdel.onclick = r.delete;
	bcut.onclick = r.cut;
	bpst.onclick = r.paste;
	bshr.onclick = r.share;

	return r;
})();


var showfile = (function () {
	var r = {};
	r.map = {
		'.ahk': 'autohotkey',
		'.bas': 'basic',
		'.bat': 'batch',
		'.cxx': 'cpp',
		'.diz': 'ans',
		'.ex': 'elixir',
		'.exs': 'elixir',
		'.frag': 'glsl',
		'.h': 'c',
		'.hpp': 'cpp',
		'.htm': 'html',
		'.hxx': 'cpp',
		'.log': 'ans',
		'.m': 'matlab',
		'.moon': 'moonscript',
		'.patch': 'diff',
		'.ps1': 'powershell',
		'.psm1': 'powershell',
		'.pl': 'perl',
		'.rs': 'rust',
		'.sh': 'bash',
		'.service': 'systemd',
		'.vb': 'vbnet',
		'.v': 'verilog',
		'.vert': 'glsl',
		'.vh': 'verilog',
		'.yml': 'yaml'
	};
	r.nmap = {
		'cmakelists.txt': 'cmake',
		'dockerfile': 'docker'
	};
	var x = txt_ext + ' ans c cfg conf cpp cs css diff glsl go html ini java js json jsx kt kts latex less lisp lua makefile md nim py r rss rb ruby sass scss sql svg swift tex toml ts vhdl xml yaml zig';
	x = x.split(/ +/g);
	for (var a = 0; a < x.length; a++)
		r.map["." + x[a]] = x[a];

	r.sname = function (srch) {
		return srch.split(/[?&]doc=/)[1].split('&')[0];
	};

	if (window.og_fn) {
		var ext = og_fn.split(/\./g).pop();
		if (r.map['.' + ext])
			hist_replace(get_evpath() + '?doc=' + og_fn);
	}

	window.Prism = { 'manual': true };
	var em = QS('#bdoc>pre');
	if (em)
		em = [r.sname(location.search), location.hash, em.textContent];
	else {
		var m = /[?&]doc=([^&]+)/.exec(location.search);
		if (m) {
			setTimeout(function () {
				r.show(uricom_dec(m[1]), true);
			}, 1);
		}
	}

	r.setstyle = function () {
		if (window.no_prism)
			return;

		qsr('#prism_css');
		var el = mknod('link', 'prism_css');
		el.rel = 'stylesheet';
		el.href = SR + '/.cpr/deps/prism' + (light ? '' : 'd') + '.css?_=' + TS;
		document.head.appendChild(el);
	};

	r.active = function () {
		return !!/[?&]doc=/.exec(location.search);
	};

	r.getlang = function (fn) {
		fn = fn.toLowerCase();
		var ext = fn.slice(fn.lastIndexOf('.'));
		return r.map[ext] || r.nmap[fn];
	}

	r.addlinks = function () {
		r.files = [];
		var links = msel.getall();
		for (var a = 0; a < links.length; a++) {
			var link = links[a],
				fn = link.vp.split('/').pop(),
				lang = r.getlang(fn);

			if (!lang)
				continue;

			r.files.push({ 'id': link.id, 'name': uricom_dec(fn) });

			var ah = ebi(link.id),
				td = ah.closest('tr').getElementsByTagName('td')[0];

			if (ah.textContent.endsWith('/'))
				continue;
	
			if (lang == 'ts' || (lang == 'md' && td.textContent != '-'))
				continue;

			td.innerHTML = '<a href="#" id="t' +
				link.id + '" class="doc bri" hl="' +
				link.id + '">-txt-</a>';

			td.getElementsByTagName('a')[0].setAttribute('href', '?doc=' + fn);
		}
		r.mktree();
		if (em) {
			render(em);
			em = null;
		}
	};

	r.show = function (url, no_push) {
		var xhr = new XHR(),
			m = /[?&](k=[^&#]+)/.exec(url);

		url = url.split('?')[0] + (m ? '?' + m[1] : '');
		xhr.url = url;
		xhr.fname = uricom_dec(url.split('/').pop());
		xhr.no_push = no_push;
		xhr.ts = Date.now();
		xhr.open('GET', url, true);
		xhr.onprogress = loading;
		xhr.onload = xhr.onerror = load_cb;
		xhr.send();
	};

	function loading(e) {
		if (e.total < 1024 * 256)
			return;

		var m = L.tv_load.format(
			esc(this.fname),
			f2f(e.loaded * 100 / e.total, 1),
			f2f(e.loaded / 1024 / 1024, 1),
			f2f(e.total / 1024 / 1024, 1))

		if (!this.toasted) {
			this.toasted = 1;
			return toast.inf(573, m);
		}
		ebi('toastb').innerHTML = lf2br(m);
	}

	function load_cb(e) {
		if (this.toasted)
			toast.hide();

		if (!xhrchk(this, L.tv_xe1, L.tv_xe2))
			return;

		render([this.url, '', this.responseText], this.no_push);
	}

	function render(doc, no_push) {
		r.q = null;
		var url = doc[0],
			lnh = doc[1],
			txt = doc[2],
			name = url.split('?')[0].split('/').pop(),
			tname = uricom_dec(name),
			lang = r.getlang(name),
			is_md = lang == 'md';

		ebi('files').style.display = ebi('gfiles').style.display = ebi('lazy').style.display = ebi('pro').style.display = ebi('epi').style.display = 'none';
		ebi('dldoc').setAttribute('href', url);
		ebi('editdoc').setAttribute('href', addq(url, 'edit'));
		ebi('editdoc').style.display = (has(perms, 'write') && (is_md || has(perms, 'delete'))) ? '' : 'none';

		var wr = ebi('bdoc'),
			defer = !Prism.highlightElement;

		var fun = function (el) {
			try {
				if (lnh.slice(0, 5) == '#doc.')
					sethash(lnh.slice(1));

				el = el || QS('#doc>code');
				Prism.highlightElement(el);
				if (el.className == 'language-ans' || (!lang && /\x1b\[[0-9;]{0,16}m/.exec(txt.slice(0, 4096))))
					r.ansify(el);
			}
			catch (ex) { }
		}

		if (txt.length > 1024 * 256)
			fun = function (el) { };

		qsr('#doc');
		var el = mknod('pre', 'doc');
		el.setAttribute('tabindex', '0');
		clmod(ebi('wrap'), 'doc', !is_md);
		if (is_md) {
			show_md(txt, name, el);
		}
		else {
			el.textContent = txt;
			el.innerHTML = '<code>' + el.innerHTML + '</code>';
			if (!window.no_prism) {
				if ((lang == 'conf' || lang == 'cfg') && ('\n' + txt).indexOf('\n# -*- mode: yaml -*-') + 1)
					lang = 'yaml';

				el.className = 'prism linkable-line-numbers line-numbers language-' + lang;
				if (!defer)
					fun(el.firstChild);
				else
					import_js(SR + '/.cpr/deps/prism.js', function () { fun(); });
			}
		}

		wr.appendChild(el);
		wr.style.display = '';
		set_tabindex();

		wintitle(tname + ' \u2014 ');
		document.documentElement.scrollTop = 0;
		var hfun = no_push ? hist_replace : hist_push;
		hfun(get_evpath() + '?doc=' + name);  // can't dk: server wants dk and js needs fk

		qsr('#docname');
		el = mknod('span', 'docname');
		el.textContent = tname;
		ebi('path').appendChild(el);

		r.updtree();
		treectl.textmode(true);
		tree_scrollto();
	}

	r.ansify = function (el) {
		var ctab = (light ?
			'bfbfbf d30253 497600 b96900 006fbb a50097 288276 2d2d2d 9f9f9f 943b55 3a5600 7f4f00 00507d 683794 004343 000000' :
			'404040 f03669 b8e346 ffa402 02a2ff f65be3 3da698 d2d2d2 606060 c75b79 c8e37e ffbe4a 71cbff b67fe3 9cf0ed ffffff').split(/ /g),
			src = el.innerHTML.split(/\x1b\[/g),
			out = ['<span>'], fg = 7, bg = null, bfg = 0, bbg = 0, inv = 0, bold = 0;

		for (var a = 0; a < src.length; a++) {
			var m = /^([0-9;]+)m/.exec(src[a]);
			if (!m) {
				if (a)
					out.push('\x1b[');

				out.push(src[a]);
				continue;
			}

			var cs = m[1].split(/;/g),
				txt = src[a].slice(m[1].length + 1);

			for (var b = 0; b < cs.length; b++) {
				var c = parseInt(cs[b]);
				if (c == 0) {
					fg = 7;
					bg = null;
					bfg = bbg = bold = inv = 0;
				}
				if (c == 1) bfg = bold = 1;
				if (c == 7) inv = 1;
				if (c == 22) bfg = bold = 0;
				if (c == 27) inv = 0;
				if (c >= 30 && c <= 37) fg = c - 30;
				if (c >= 40 && c <= 47) bg = c - 40;
				if (c >= 90 && c <= 97) {
					fg = c - 90;
					bfg = 1;
				}
				if (c >= 100 && c <= 107) {
					bg = c - 100;
					bbg = 1;
				}
			}

			var cfg = fg, cbg = bg;
			if (inv) {
				cbg = fg;
				cfg = bg || 0;
			}

			var s = '</span><span style="color:#' + ctab[cfg + bfg * 8];
			if (cbg !== null)
				s += ';background:#' + ctab[cbg + bbg * 8];
			if (bold)
				s += ';font-weight:bold';

			out.push(s + '">' + txt);
		}
		el.innerHTML = out.join('');
	};

	r.mktree = function () {
		var html = ['<li class="bn">' + L.tv_lst + '<br />' + linksplit(get_vpath()).join('<span>/</span>') + '</li>'];
		for (var a = 0; a < r.files.length; a++) {
			var file = r.files[a];
			html.push('<li><a href="?doc=' +
				uricom_enc(file.name) + '" hl="' + file.id +
				'">' + esc(file.name) + '</a>');
		}
		ebi('docul').innerHTML = html.join('\n');
	};

	r.updtree = function () {
		var fn = QS('#path span:last-child'),
			lis = QSA('#docul li a'),
			sels = msel.getsel(),
			actsel = false;

		fn = fn ? fn.textContent : '';
		for (var a = 0, aa = lis.length; a < aa; a++) {
			var lin = lis[a].textContent,
				sel = false;

			for (var b = 0; b < sels.length; b++)
				if (vsplit(sels[b].vp)[1] == lin)
					sel = true;

			clmod(lis[a], 'hl', lin == fn);
			clmod(lis[a], 'sel', sel);
			if (lin == fn && sel)
				actsel = true;
		}
		clmod(ebi('seldoc'), 'sel', actsel);
	};

	r.tglsel = function () {
		var fn = ebi('docname').textContent;
		for (var a = 0; a < r.files.length; a++)
			if (r.files[a].name == fn)
				clmod(ebi(r.files[a].id).closest('tr'), 'sel', 't');

		msel.selui();
	};

	var bdoc = ebi('bdoc');
	bdoc.className = 'line-numbers';
	bdoc.innerHTML = (
		'<div id="hdoc" class="ghead">\n' +
		'<a href="#" class="btn" id="xdoc" tt="' + L.tvt_close + '</a>\n' +
		'<a href="#" class="btn" id="dldoc" tt="' + L.tvt_dl + '</a>\n' +
		'<a href="#" class="btn" id="prevdoc" tt="' + L.tvt_prev + '</a>\n' +
		'<a href="#" class="btn" id="nextdoc" tt="' + L.tvt_next + '</a>\n' +
		'<a href="#" class="btn" id="seldoc" tt="' + L.tvt_sel + '</a>\n' +
		'<a href="#" class="btn" id="editdoc" tt="' + L.tvt_edit + '</a>\n' +
		'</div>'
	);
	ebi('xdoc').onclick = function () {
		thegrid.setvis(true);
	};
	ebi('dldoc').setAttribute('download', '');
	ebi('prevdoc').onclick = function () { tree_neigh(-1); };
	ebi('nextdoc').onclick = function () { tree_neigh(1); };
	ebi('seldoc').onclick = r.tglsel;

	return r;
})();


var thegrid = (function () {
	var lfiles = ebi('files'),
		gfiles = mknod('div', 'gfiles');

	gfiles.style.display = 'none';
	gfiles.innerHTML = (
		'<div id="ghead" class="ghead">' +
		'<a href="#" class="tgl btn" id="gridvau" tt="' + L.gt_vau + '</a> ' +
		'<a href="#" class="tgl btn" id="gridsel" tt="' + L.gt_msel + '</a> ' +
		'<a href="#" class="tgl btn" id="gridcrop" tt="' + L.gt_crop + '</a> ' +
		'<a href="#" class="tgl btn" id="grid3x" tt="' + L.gt_3x + '</a> ' +
		'<span>' + L.gt_zoom + ': ' +
		'<a href="#" class="btn" z="-1.1" tt="Hotkey: shift-A">&ndash;</a> ' +
		'<a href="#" class="btn" z="1.1" tt="Hotkey: shift-D">+</a></span> <span>' + L.gt_chop + ': ' +
		'<a href="#" class="btn" l="-1" tt="' + L.gt_c1 + '">&ndash;</a> ' +
		'<a href="#" class="btn" l="1" tt="' + L.gt_c2 + '">+</a></span> <span>' + L.gt_sort + ': ' +
		'<a href="#" s="href">' + L.gt_name + '</a> ' +
		'<a href="#" s="sz">' + L.gt_sz + '</a> ' +
		'<a href="#" s="ts">' + L.gt_ts + '</a> ' +
		'<a href="#" s="ext">' + L.gt_ext + '</a>' +
		'</span></div>' +
		'<div id="ggrid"></div>'
	);
	lfiles.parentNode.insertBefore(gfiles, lfiles);
	var ggrid = ebi('ggrid');

	var r = {
		'sz': clamp(fcfg_get('gridsz', 10), 4, 80),
		'ln': clamp(icfg_get('gridln', 3), 1, 7),
		'isdirty': true,
		'bbox': null
	};

	var btnclick = function (e) {
		ev(e);
		var s = this.getAttribute('s'),
			z = this.getAttribute('z'),
			l = this.getAttribute('l');

		if (z)
			return setsz(z > 0 ? r.sz * z : r.sz / (-z));

		if (l)
			return setln(parseInt(l));

		var t = lfiles.tHead.rows[0].cells;
		for (var a = 0; a < t.length; a++)
			if (t[a].getAttribute('name') == s) {
				t[a].click();
				break;
			}

		r.setdirty();
	};

	var links = QSA('#ghead a');
	for (var a = 0; a < links.length; a++)
		links[a].onclick = btnclick;

	r.setvis = function (force) {
		if (showfile.active()) {
			if (!force)
				return;

			hist_push(get_evpath() + (dk ? '?k=' + dk : ''));
			wintitle();
		}

		lfiles = ebi('files');
		gfiles = ebi('gfiles');
		ggrid = ebi('ggrid');

		var vis = has(perms, "read");
		gfiles.style.display = vis && r.en ? '' : 'none';
		lfiles.style.display = vis && !r.en ? '' : 'none';
		clmod(ggrid, 'crop', r.crop);
		clmod(ggrid, 'nocrop', !r.crop);
		ebi('pro').style.display = ebi('epi').style.display = ebi('lazy').style.display = ebi('treeul').style.display = ebi('treepar').style.display = '';
		ebi('bdoc').style.display = 'none';
		clmod(ebi('wrap'), 'doc');
		qsr('#docname');
		if (treectl)
			treectl.textmode(false);

		if (filecols)
			filecols.uivis();

		aligngriditems();
		restore_scroll();
	};

	r.setdirty = function () {
		r.dirty = true;
		if (r.en)
			loadgrid();
		else
			r.setvis();
	};

	function setln(v) {
		if (v) {
			r.ln += v;
			if (r.ln < 1) r.ln = 1;
			if (r.ln > 7) r.ln = v < 0 ? 7 : 99;
			swrite('gridln', r.ln);
			setTimeout(r.tippen, 20);
		}
		try {
			document.documentElement.style.setProperty('--grid-ln', r.ln);
		}
		catch (ex) { }
	}
	setln();

	function setsz(v) {
		if (v !== undefined) {
			r.sz = clamp(v, 4, 80);
			swrite('gridsz', r.sz);
			setTimeout(r.tippen, 20);
		}
		try {
			document.documentElement.style.setProperty('--grid-sz', r.sz + 'em');
		}
		catch (ex) { }
		aligngriditems();
	}
	setsz();

	function gclick1(e) {
		if (ctrl(e) && !treectl.csel && !r.sel)
			return true;

		return gclick.call(this, e, false);
	}

	function gclick2(e) {
		if (ctrl(e) || !r.sel)
			return true;

		return gclick.call(this, e, true);
	}

	function gclick(e, dbl) {
		var oth = ebi(this.getAttribute('ref')),
			href = noq_href(this),
			fid = oth.getAttribute('id'),
			aplay = ebi('a' + fid),
			atext = ebi('t' + fid),
			is_txt = atext && showfile.getlang(href) && !/\.ts$/.test(href),
			is_img = img_re.test(href),
			is_dir = href.endsWith('/'),
			is_srch = !!ebi('unsearch'),
			in_tree = is_dir && treectl.find(oth.textContent.slice(0, -1)),
			have_sel = QS('#files tr.sel'),
			td = oth.closest('td').nextSibling,
			tr = td.parentNode;

		if (!is_srch && ((r.sel && !dbl && !ctrl(e)) || (treectl.csel && (e.shiftKey || ctrl(e))))) {
			td.onclick.call(td, e);
			if (e.shiftKey)
				return r.loadsel();
			clmod(this, 'sel', clgot(tr, 'sel'));
		}
		else if (in_tree && !have_sel)
			in_tree.click();

		else if (oth.hasAttribute('download'))
			oth.click();

		else if (aplay && (r.vau || !is_img))
			aplay.click();

		else if (is_dir && !have_sel)
			treectl.reqls(href, true);

		else if (is_txt && !has(['md', 'htm', 'html'], is_txt))
			atext.click();

		else if (!is_img && have_sel)
			window.open(href, '_blank');

		else {
			if (!dbl)
				return true;

			setTimeout(function () {
				r.sel = true;
			}, 1);
			r.sel = false;
			this.click();
		}
		ev(e);
	}

	r.imshow = function (url) {
		var sel = '#ggrid>a'
		if (!thegrid.en) {
			thegrid.bagit('#files');
			sel = '#files a[id]';
		}
		var ims = QSA(sel);
		for (var a = 0, aa = ims.length; a < aa; a++) {
			var iu = ims[a].getAttribute('href').split('?')[0].split('/').slice(-1)[0];
			if (iu == url)
				return ims[a].click();
		}
		baguetteBox.hide();
	};

	r.loadsel = function () {
		if (r.dirty)
			return;

		var ths = QSA('#ggrid>a');

		for (var a = 0, aa = ths.length; a < aa; a++) {
			var tr = ebi(ths[a].getAttribute('ref')).closest('tr'),
				cl = tr.className || '';

			if (noq_href(ths[a]).endsWith('/'))
				cl += ' dir';

			ths[a].className = cl;
		}

		var sp = ['unsearch', 'moar'];
		for (var a = 0; a < sp.length; a++)
			(function (a) {
				var o = QS('#ggrid a[ref="' + sp[a] + '"]');
				if (o)
					o.onclick = function (e) {
						ev(e);
						ebi(sp[a]).click();
					};
			})(a);
	};

	r.tippen = function () {
		var els = QSA('#ggrid>a>span'),
			aa = els.length;

		if (!aa)
			return;

		var cs = window.getComputedStyle(els[0]),
			fs = parseFloat(cs.lineHeight),
			pad = parseFloat(cs.paddingTop),
			pels = [],
			todo = [];

		for (var a = 0; a < aa; a++) {
			var vis = Math.round((els[a].offsetHeight - pad) / fs),
				all = Math.round((els[a].scrollHeight - pad) / fs),
				par = els[a].parentNode;

			pels.push(par);
			todo.push(vis < all ? par.getAttribute('ttt') : null);
		}

		for (var a = 0; a < todo.length; a++) {
			if (todo[a])
				pels[a].setAttribute('tt', todo[a]);
			else
				pels[a].removeAttribute('tt');
		}

		tt.att(ggrid);
	};

	function loadgrid() {
		if (have_webp === null)
			return setTimeout(loadgrid, 50);

		r.setvis();
		if (!r.dirty)
			return r.loadsel();

		if (dcrop.startsWith('f') || !sread('gridcrop'))
			bcfg_upd_ui('gridcrop', r.crop = ('y' == dcrop.slice(-1)));

		if (dth3x.startsWith('f') || !sread('grid3x'))
			bcfg_upd_ui('grid3x', r.x3 = ('y' == dth3x.slice(-1)));

		var html = [],
			svgs = new Set(),
			max_svgs = CHROME ? 500 : 5000,
			files = QSA('#files>tbody>tr>td:nth-child(2) a[id]');

		for (var a = 0, aa = files.length; a < aa; a++) {
			var ao = files[a],
				ohref = esc(ao.getAttribute('href')),
				href = ohref.split('?')[0],
				name = uricom_dec(vsplit(href)[1]),
				ref = ao.getAttribute('id'),
				isdir = href.endsWith('/'),
				ac = isdir ? ' class="dir"' : '',
				ihref = ohref;

			if (r.thumbs) {
				ihref = addq(ihref, 'th=' + (have_webp ? 'w' : 'j'));
				if (!r.crop)
					ihref += 'f';
				if (r.x3)
					ihref += '3';
				if (href == "#")
					ihref = SR + '/.cpr/ico/' + (ref == 'moar' ? '++' : 'exit');
			}
			else if (isdir) {
				ihref = SR + '/.cpr/ico/folder';
			}
			else {
				var ar = href.split('.');
				if (ar.length > 1)
					ar = ar.slice(1);

				ihref = '';
				ar.reverse();
				for (var b = 0; b < ar.length; b++) {
					if (ar[b].length > 7)
						break;

					ihref = ar[b] + '.' + ihref;
				}
				if (!ihref) {
					ihref = 'unk.';
				}
				var ext = ihref.slice(0, -1);
				if (!svgs.has(ext)) {
					if (svgs.size < max_svgs)
						svgs.add(ext);
					else
						ext = "unk";
				}
				ihref = SR + '/.cpr/ico/' + ext;
			}
			ihref = addq(ihref, 'cache=i&_=' + ACB + TS);
			if (CHROME)
				ihref += "&raster";

			html.push('<a href="' + ohref + '" ref="' + ref +
				'"' + ac + ' ttt="' + esc(name) + '"><img style="height:' +
				(r.sz / 1.25) + 'em" loading="lazy" onload="th_onload(this)" src="' +
				ihref + '" /><span' + ac + '>' + ao.innerHTML + '</span></a>');
		}
		ggrid.innerHTML = html.join('\n');
		clmod(ggrid, 'crop', r.crop);
		clmod(ggrid, 'nocrop', !r.crop);

		var srch = ebi('unsearch'),
			gsel = ebi('gridsel');

		gsel.style.display = srch ? 'none' : '';
		if (srch && r.sel)
			gsel.click();

		var ths = QSA('#ggrid>a');
		for (var a = 0, aa = ths.length; a < aa; a++) {
			ths[a].ondblclick = gclick2;
			ths[a].onclick = gclick1;
		}

		r.dirty = false;
		r.bagit('#ggrid');
		r.loadsel();
		aligngriditems();
		setTimeout(r.tippen, 20);
	}

	r.bagit = function (isrc) {
		if (!window.baguetteBox)
			return;

		if (r.bbox)
			baguetteBox.destroy();

		var br = baguetteBox.run(isrc, {
			noScrollbars: true,
			duringHide: r.onhide,
			afterShow: function () {
				r.bbox_opts.refocus = true;
			},
			captions: function (g) {
				var idx = -1,
					h = '' + g;

				for (var a = 0; a < r.bbox.length; a++)
					if (r.bbox[a].imageElement == g)
						idx = a;

				return '<a download href="' + h +
					'">' + (idx + 1) + ' / ' + r.bbox.length + ' -- ' +
					esc(uricom_dec(h.split('/').pop())) + '</a>';
			},
			onChange: function (i) {
				sethash('g' + r.bbox[i].imageElement.getAttribute('ref'));
			}
		});
		r.bbox = br[0][0];
		r.bbox_opts = br[1];
	};

	r.onhide = function () {
		afilt.apply();

		if (!thegrid.ihop)
			return;

		try {
			var el = QS('#ggrid a[ref="' + location.hash.slice(2) + '"]'),
				f = function () {
					try {
						el.focus();
					}
					catch (ex) { }
				};

			f();
			setTimeout(f, 10);
			setTimeout(f, 100);
			setTimeout(f, 200);
			// thx fullscreen api

			if (ANIM) {
				clmod(el, 'glow', 1);
				setTimeout(function () {
					try {
						clmod(el, 'glow');
					}
					catch (ex) { }
				}, 600);
			}
			r.bbox_opts.refocus = false;
		}
		catch (ex) {
			console.log('ihop:', ex);
		}
	};

	r.set_crop = function (en) {
		if (!dcrop.startsWith('f'))
			return r.setdirty();

		r.crop = dcrop.endsWith('y');
		bcfg_upd_ui('gridcrop', r.crop);
		if (r.crop != en)
			toast.warn(10, L.ul_btnlk);
	};

	r.set_x3 = function (en) {
		if (!dth3x.startsWith('f'))
			return r.setdirty();

		r.x3 = dth3x.endsWith('y');
		bcfg_upd_ui('grid3x', r.x3);
		if (r.x3 != en)
			toast.warn(10, L.ul_btnlk);
	};

	bcfg_bind(r, 'thumbs', 'thumbs', true, r.setdirty);
	bcfg_bind(r, 'ihop', 'ihop', true);
	bcfg_bind(r, 'vau', 'gridvau', false);
	bcfg_bind(r, 'crop', 'gridcrop', !dcrop.endsWith('n'), r.set_crop);
	bcfg_bind(r, 'x3', 'grid3x', dth3x.endsWith('y'), r.set_x3);
	bcfg_bind(r, 'sel', 'gridsel', false, r.loadsel);
	bcfg_bind(r, 'en', 'griden', dgrid, function (v) {
		v ? loadgrid() : r.setvis(true);
		pbar.onresize();
		vbar.onresize();
	});
	ebi('wtgrid').onclick = ebi('griden').onclick;

	return r;
})();


function th_onload(el) {
	el.style.height = '';
}


function tree_scrollto(e) {
	ev(e);
	tree_scrolltoo('#treeul a.hl');
	tree_scrolltoo('#docul a.hl');
}


function tree_scrolltoo(q) {
	var act = QS(q),
		ul = act ? act.offsetParent : null;

	if (!ul)
		return;

	var ctr = ebi('tree'),
		em = parseFloat(getComputedStyle(act).fontSize),
		top = act.offsetTop + ul.offsetTop,
		min = top - 11 * em,
		max = top - (ctr.offsetHeight - 10 * em);

	if (ctr.scrollTop > min)
		ctr.scrollTop = Math.floor(min);
	else if (ctr.scrollTop < max)
		ctr.scrollTop = Math.floor(max);
}


function tree_neigh(n) {
	var links = QSA(showfile.active() || treectl.texts ? '#docul li>a' : '#treeul li>a+a');
	if (!links.length) {
		treectl.dir_cb = function () {
			tree_neigh(n);
			treectl.detree();
		};
		treectl.entree(null, true);
		return;
	}
	var act = -1;
	for (var a = 0, aa = links.length; a < aa; a++) {
		if (clgot(links[a], 'hl')) {
			act = a;
			break;
		}
	}
	if (act == -1 && !treectl.texts)
		return;

	act += n;
	if (act < 0)
		act = links.length - 1;
	if (act >= links.length)
		act = 0;

	if (showfile.active())
		links[act].click();
	else
		treectl.treego.call(links[act]);

	links[act].focus();
}


function tree_up(justgo) {
	if (showfile.active())
		return thegrid.setvis(true);

	var act = QS('#treeul a.hl');
	if (!act) {
		treectl.dir_cb = function () {
			tree_up(justgo);
			treectl.detree();
		};
		treectl.entree(null, true);
		return;
	}
	if (act.previousSibling.textContent == '-') {
		act.previousSibling.click();
		if (!justgo)
			return;
	}
	var a = act.parentNode.parentNode.parentNode.getElementsByTagName('a')[1];
	if (a.parentNode.tagName == 'LI')
		a.click();
}


function hkhelp() {
	var html = [];
	for (var ic = 0; ic < L.hks.length; ic++) {
		var c = L.hks[ic];
		html.push('<table>');
		for (var a = 0; a < c.length; a++)
			try {
				if (c[a].length != 2)
					html.push('<tr><th colspan="2">' + esc(c[a]) + '</th></tr>');
				else
					html.push('<tr><td>{0}</td><td>{1}</td></tr>'.format(c[a][0], c[a][1]));
			}
			catch (ex) {
				html.push(">>> " + c[a]);
			}

		html.push('</table>');
	}
	qsr('#hkhelp');
	var o = mknod('div', 'hkhelp');
	o.innerHTML = html.join('\n');
	document.body.appendChild(o);
}


var fselgen, fselctr;
function fselfunw(e, ae, d, rem) {
	fselctr = 0;
	var gen = fselgen = Date.now();
	if (rem)
		rem *= window.innerHeight;

	var selfun = function () {
		var el = ae[d + 'ElementSibling'];
		if (!el || gen != fselgen)
			return;

		el.focus();
		var elh = el.offsetHeight;
		if (ctrl(e))
			document.documentElement.scrollTop += (d == 'next' ? 1 : -1) * elh;

		if (e.shiftKey) {
			clmod(el, 'sel', 't');
			msel.origin_tr(el);
			msel.selui();
		}

		rem -= elh;
		if (rem > 0) {
			ae = document.activeElement;
			if (++fselctr % 5 && rem > elh * (FIREFOX ? 5 : 2))
				selfun();
			else
				setTimeout(selfun, 1);
		}
	}
	selfun();
}
var ahotkeys = function (e) {
	if (e.altKey || e.isComposing)
		return;

	if (QS('#bbox-overlay.visible') || modal.busy)
		return;

	var k = (e.code || e.key) + '', pos = -1, n,
		ae = document.activeElement,
		aet = ae && ae != document.body ? ae.nodeName.toLowerCase() : '';

	if (e.key == '?')
		return hkhelp();

	if (k == 'Escape' || k == 'Esc') {
		ae && ae.blur();
		tt.hide();

		if (ebi('hkhelp'))
			return qsr('#hkhelp');

		if (toast.visible)
			return toast.hide();

		if (ebi('rn_cancel'))
			return ebi('rn_cancel').click();

		if (ebi('sh_abrt'))
			return ebi('sh_abrt').click();

		if (QS('.opview.act'))
			return QS('#ops>a').click();

		if (widget.is_open)
			return widget.close();

		if (showfile.active())
			return thegrid.setvis(true);

		if (!treectl.hidden)
			return treectl.detree();

		if (QS('#unsearch'))
			return QS('#unsearch').click();

		if (thegrid.en)
			return ebi('griden').click();
	}

	if ((aet == 'tr' || aet == 'td') && ae.closest('#files')) {
		var d = '', rem = 0;
		if (aet == 'td') ae = ae.closest('tr'); //ie11
		if (k == 'ArrowUp' || k == 'Up') d = 'previous';
		if (k == 'ArrowDown' || k == 'Down') d = 'next';
		if (k == 'PageUp') { d = 'previous'; rem = 0.6; }
		if (k == 'PageDown') { d = 'next'; rem = 0.6; }
		if (d) {
			fselfunw(e, ae, d, rem);
			return ev(e);
		}
		if (k == 'Space' || k == 'Spacebar') {
			clmod(ae, 'sel', 't');
			msel.origin_tr(ae);
			msel.selui();
			return ev(e);
		}
		if ((k == 'KeyA' || k == 'a') && ctrl(e)) {
			var sel = msel.getsel(),
				all = msel.getall();

			msel.evsel(e, sel.length < all.length);
			msel.origin_id(null);
			return ev(e);
		}
	}

	if (ae && ae.closest('pre')) {
		if ((k == 'KeyA' || k == 'a') && ctrl(e)) {
			var sel = document.getSelection(),
				ran = document.createRange();

			sel.removeAllRanges();
			ran.selectNode(ae.closest('pre'));
			sel.addRange(ran);
			return ev(e);
		}
	}

	if (k.endsWith('Enter') && ae && (ae.onclick || ae.hasAttribute('tabIndex')))
		return ev(e) && ae.click() || true;

	if (aet && aet != 'a' && aet != 'tr' && aet != 'td' && aet != 'div' && aet != 'pre')
		return;

	if (ctrl(e)) {
		if (k == 'KeyX' || k == 'x')
			return fileman.cut();

		if (k == 'KeyV' || k == 'v')
			return fileman.d_paste();

		if (k == 'KeyK' || k == 'k')
			return fileman.delete();

		return;
	}

	if (e.shiftKey && k != 'KeyA' && k != 'KeyD' && k != 'A' && k != 'D')
		return;

	if (k.indexOf('Digit') === 0)
		pos = parseInt(k.slice(-1)) * 0.1;

	if (pos !== -1)
		return seek_au_mul(pos) || true;

	if (k == 'KeyJ' || k == 'j')
		return prev_song() || true;

	if (k == 'KeyL' || k == 'l')
		return next_song() || true;

	if (k == 'KeyP' || k == 'p')
		return playpause() || true;

	n = (k == 'KeyU' || k == 'u') ? -10 :
		(k == 'KeyO' || k == 'o') ? 10 : 0;
	if (n !== 0)
		return seek_au_rel(n) || true;

	if (k == 'KeyY')
		return msel.getsel().length ? ebi('seldl').click() :
			showfile.active() ? ebi('dldoc').click() :
				dl_song();

	n = (k == 'KeyI' || k == 'i') ? -1 :
		(k == 'KeyK' || k == 'k') ? 1 : 0;
	if (n !== 0)
		return tree_neigh(n);

	if (k == 'KeyM' || k == 'm')
		return tree_up();

	if (k == 'KeyB' || k == 'b')
		return treectl.hidden ? treectl.entree() : treectl.detree();

	if (k == 'KeyG' || k == 'g')
		return ebi('griden').click();

	if (k == 'KeyT' || k == 't')
		return ebi('thumbs').click();

	if (k == 'KeyV' || k == 'v')
		return ebi('filetree').click();

	if (k == 'F2')
		return fileman.rename();

	if (!treectl.hidden && (!e.shiftKey || !thegrid.en)) {
		if (k == 'KeyA' || k == 'a')
			return QS('#twig').click();

		if (k == 'KeyD' || k == 'd')
			return QS('#twobytwo').click();
	}

	if (showfile.active()) {
		if (k == 'KeyS' || k == 's')
			showfile.tglsel();
		if ((k == 'KeyE' || k == 'e') && ebi('editdoc').style.display != 'none')
			ebi('editdoc').click();
	}

	if (thegrid.en) {
		if (k == 'KeyS' || k == 's')
			return ebi('gridsel').click();

		if (k == 'KeyA' || k == 'a')
			return QSA('#ghead a[z]')[0].click();

		if (k == 'KeyD' || k == 'd')
			return QSA('#ghead a[z]')[1].click();
	}
};


// search
(function () {
	var sconf = [
		[
			L.s_sz,
			["szl", "sz_min", L.s_s1, "14", ""],
			["szu", "sz_max", L.s_s2, "14", ""]
		],
		[
			L.s_dt,
			["dtl", "dt_min", L.s_d1, "14", "1997-08-15, 01:00"],
			["dtu", "dt_max", L.s_d2, "14", "2020"]
		],
		[
			L.s_rd,
			["path", "path", L.s_r1, "30", "windows  -system32"]
		],
		[
			L.s_fn,
			["name", "name", L.s_f1, "30", ".exe$"]
		],
		[
			L.s_ta,
			["tags", "tags", L.s_t1, "30", "^irui$"]
		],
		[
			L.s_ad,
			["adv", "adv", L.s_a1, "30", "key>=1A  key<=2B  .bpm>165"]
		],
		[
			L.s_ua,
			["utl", "ut_min", L.s_u1, "14", "2007-04-08"],
			["utu", "ut_max", L.s_u2, "14", "2038-01-19"]
		]
	];

	var trs = [],
		orig_url = null,
		orig_html = null,
		cap = 125;

	for (var a = 0; a < sconf.length; a++) {
		var html = ['<tr id="tsrch_' + sconf[a][1][0] + '"><td><br />' + sconf[a][0] + '</td>'];
		for (var b = 1; b < 3; b++) {
			var hn = "srch_" + sconf[a][b][0],
				csp = (sconf[a].length == 2) ? 2 : 1;

			html.push(
				'<td colspan="' + csp + '"><input id="' + hn + 'c" type="checkbox">\n' +
				'<label for="' + hn + 'c">' + sconf[a][b][2] + '</label>\n' +
				'<br /><input id="' + hn + 'v" type="text" style="width:' + sconf[a][b][3] +
				'em" name="' + sconf[a][b][1] + '" placeholder="' + sconf[a][b][4] + '" /></td>');
			if (csp == 2)
				break;
		}
		html.push('</tr>');
		trs.push(html);
	}
	var html = [];
	for (var a = 0; a < trs.length; a += 2) {
		html.push('<table>' + (trs[a].concat(trs[a + 1])).join('\n') + '</table>');
	}
	html.push('<table id="tq_raw"><tr><td>raw</td><td><input id="q_raw" type="text" name="q" ' + NOAC + ' placeholder="( tags like *nhato* or tags like *taishi* ) and ( not tags like *nhato* or not tags like *taishi* )" /></td></tr></table>');
	ebi('srch_form').innerHTML = html.join('\n');

	var o = QSA('#op_search input');
	for (var a = 0; a < o.length; a++) {
		o[a].oninput = ev_search_input;
		o[a].onkeydown = ev_search_keydown;
	}

	function srch_msg(err, txt) {
		var o = ebi('srch_q');
		o.textContent = txt;
		clmod(o, 'err', err);
	}

	var search_timeout,
		defer_timeout,
		search_in_progress = 0;

	function ev_search_input() {
		var v = unsmart(this.value),
			id = this.getAttribute('id'),
			is_txt = id.slice(-1) == 'v',
			is_chk = id.slice(-1) == 'c';

		if (is_txt) {
			var chk = ebi(id.slice(0, -1) + 'c');
			chk.checked = ((v + '').length > 0);
		}

		if (id != "q_raw")
			encode_query();

		set_vq();
		cap = 125;

		clearTimeout(defer_timeout);
		if (is_chk)
			return do_search();

		defer_timeout = setTimeout(try_search, 2000);
		try_search(v);
	}

	function ev_search_keydown(e) {
		if ((e.key + '').endsWith('Enter'))
			do_search();
	}

	function try_search(v) {
		if (Date.now() - search_in_progress > 30 * 1000) {
			clearTimeout(defer_timeout);
			clearTimeout(search_timeout);
			search_timeout = setTimeout(do_search,
				v && v.length < (MOBILE ? 4 : 3) ? 1000 : 500);
		}
	}

	function set_vq() {
		if (search_in_progress)
			return;

		var q = unsmart(ebi('q_raw').value),
			vq = ebi('files').getAttribute('q_raw');

		srch_msg(false, (q == vq) ? '' : L.sm_prev + (vq ? vq : '(*)'));
	}

	function encode_query() {
		var q = '';
		for (var a = 0; a < sconf.length; a++) {
			for (var b = 1; b < sconf[a].length; b++) {
				var k = sconf[a][b][0],
					chk = 'srch_' + k + 'c',
					vs = unsmart(ebi('srch_' + k + 'v').value),
					tvs = [];

				if (a == 1)
					vs = vs.trim().replace(/ +/, 'T');

				while (vs) {
					vs = vs.trim();
					if (!vs)
						break;

					var v = '';
					if (vs.startsWith('"')) {
						var vp = vs.slice(1).split(/"(.*)/);
						v = vp[0];
						vs = vp[1] || '';
						while (v.endsWith('\\')) {
							vp = vs.split(/"(.*)/);
							v = v.slice(0, -1) + '"' + vp[0];
							vs = vp[1] || '';
						}
					}
					else {
						var vp = vs.split(/ +(.*)/);
						v = vp[0].replace(/\\"/g, '"');
						vs = vp[1] || '';
					}
					tvs.push(v);
				}

				if (!ebi(chk).checked)
					continue;

				for (var c = 0; c < tvs.length; c++) {
					var tv = tvs[c];
					if (!tv.length)
						break;

					q += ' and ';

					if (k == 'adv') {
						q += tv.replace(/ +/g, " and ").replace(/([=!><]=?)/, " $1 ");
						continue;
					}

					if (k.length == 3) {
						q += k.replace(/l$/, ' >= ').replace(/u$/, ' <= ').replace(/^sz/, 'size').replace(/^dt/, 'date').replace(/^ut/, 'up_at') + tv;
						continue;
					}

					if (k == 'path' || k == 'name' || k == 'tags') {
						var not = '';
						if (tv.slice(0, 1) == '-') {
							tv = tv.slice(1);
							not = 'not ';
						}

						if (tv.slice(0, 1) == '^') {
							tv = tv.slice(1);
						}
						else {
							tv = '*' + tv;
						}

						if (tv.slice(-1) == '$') {
							tv = tv.slice(0, -1);
						}
						else {
							tv += '*';
						}

						if (tv.indexOf(' ') + 1) {
							tv = '"' + tv + '"';
						}

						q += not + k + ' like ' + tv;
					}
				}
			}
		}
		ebi('q_raw').value = q.slice(5);
	}

	function do_search() {
		search_in_progress = Date.now();
		srch_msg(false, L.sm_w8);
		clearTimeout(search_timeout);

		var xhr = new XHR();
		xhr.open('POST', SR + '/?srch', true);
		xhr.setRequestHeader('Content-Type', 'text/plain');
		xhr.onload = xhr.onerror = xhr_search_results;
		xhr.ts = Date.now();
		xhr.q_raw = unsmart(ebi('q_raw').value);
		xhr.send(JSON.stringify({ "q": xhr.q_raw, "n": cap }));
	}

	function xhr_search_results() {
		if (this.status !== 200) {
			var msg = hunpre(this.responseText);
			srch_msg(true, "http " + this.status + ": " + msg);
			search_in_progress = 0;
			return;
		}
		search_in_progress = 0;
		srch_msg(false, '');

		var res = JSON.parse(this.responseText),
			tagord = res.tag_order;

		sortfiles(res.hits);

		var ofiles = ebi('files');
		if (ofiles.getAttribute('ts') > this.ts)
			return;

		treectl.hide();
		thegrid.setvis(true);

		var html = mk_files_header(tagord), seen = {};
		html.push('<tbody>');
		html.push('<tr class="srch_hdr"><td>-</td><td><a href="#" id="unsearch"><big style="font-weight:bold">[❌] ' + L.sl_close + '</big></a> -- ' + L.sl_hits.format(res.hits.length) + (res.trunc ? ' -- <a href="#" id="moar">' + L.sl_moar + '</a>' : '') + '</td></tr>');

		for (var a = 0; a < res.hits.length; a++) {
			var r = res.hits[a],
				ts = parseInt(r.ts),
				sz = esc(r.sz + ''),
				rp = esc(uricom_dec(r.rp + '')),
				ext = rp.lastIndexOf('.') > 0 ? rp.split('.').pop().split('?')[0] : '%',
				id = 'f-' + ('00000000' + crc32(rp)).slice(-8);

			while (seen[id])
				id += 'a';
			seen[id] = 1;

			if (ext.length > 8)
				ext = '%';

			var links = linksplit(r.rp + '', id).join('<span>/</span>'),
				nodes = ['<tr><td>-</td><td><div>' + links + '</div>', sz];

			for (var b = 0; b < tagord.length; b++) {
				var k = tagord[b],
					v = r.tags[k] || "";

				if (k == ".dur") {
					var sv = v ? s2ms(v) : "";
					nodes[nodes.length - 1] += '</td><td sortv="' + v + '">' + sv;
					continue;
				}

				nodes.push(v);
			}

			nodes = nodes.concat([ext, unix2iso(ts)]);
			html.push(nodes.join('</td><td>'));
			html.push('</td></tr>');
		}

		if (!orig_html || orig_url != get_evpath()) {
			orig_html = ebi('files').innerHTML;
			orig_url = get_evpath();
		}

		ofiles = set_files_html(html.join('\n'));
		ofiles.setAttribute("ts", this.ts);
		ofiles.setAttribute("q_raw", this.q_raw);
		set_vq();
		mukey.render();
		reload_browser();
		filecols.set_style(['File Name']);

		sethash('q=' + uricom_enc(this.q_raw));
		ebi('unsearch').onclick = unsearch;
		var m = ebi('moar');
		if (m)
			m.onclick = moar;
	}

	function unsearch(e) {
		ev(e);
		treectl.show();
		set_files_html(orig_html);
		ebi('files').removeAttribute('q_raw');
		orig_html = null;
		sethash('');
		reload_browser();
	}

	function moar(e) {
		ev(e);
		cap *= 2;
		do_search();
	}
})();


function aligngriditems() {
	if (!treectl)
		return;

	var ggrid = ebi('ggrid'),
		em2px = parseFloat(getComputedStyle(ggrid).fontSize),
		gridsz = 10;
	try {
		gridsz = cprop('--grid-sz').slice(0, -2);
	}
	catch (ex) { }
	var gridwidth = ggrid.clientWidth,
		griditemcount = ggrid.children.length,
		totalgapwidth = em2px * griditemcount;

	if (/b/.test(themen + ''))
		totalgapwidth *= 2.8;

	var val, st = ggrid.style;

	if (((griditemcount * em2px) * gridsz) + totalgapwidth < gridwidth) {
		val = 'left';
	} else {
		val = treectl.hidden ? 'center' : 'space-between';
	}
	if (st.justifyContent != val)
		st.justifyContent = val;
}
onresize100.add(aligngriditems);


var filecolwidth = (function () {
	var lastwidth = -1;

	return function () {
		var vw = window.innerWidth / parseFloat(getComputedStyle(document.body)['font-size']),
			w = Math.floor(vw - 2);

		if (w == lastwidth)
			return;

		lastwidth = w;
		try {
			document.documentElement.style.setProperty('--file-td-w', w + 'em');
		}
		catch (ex) { }
	}
})();
onresize100.add(filecolwidth, true);


var treectl = (function () {
	var r = {
		"hidden": true,
		"sb_msg": false,
		"ls_cb": null,
		"dir_cb": tree_scrollto,
		"pdir": []
	},
		entreed = false,
		fixedpos = false,
		prev_atop = null,
		prev_winh = null,
		mentered = null,
		treesz = clamp(icfg_get('treesz', 16), 10, 50);

	bcfg_bind(r, 'ireadme', 'ireadme', true);
	bcfg_bind(r, 'idxh', 'idxh', idxh, setidxh);
	bcfg_bind(r, 'dyn', 'dyntree', true, onresize);
	bcfg_bind(r, 'csel', 'csel', dgsel);
	bcfg_bind(r, 'dots', 'dotfiles', false, function (v) {
		r.goto();
		var xhr = new XHR();
		xhr.open('GET', SR + '/?setck=dots=' + (v ? 'y' : ''), true);
		xhr.send();
	});
	bcfg_bind(r, 'dir1st', 'dir1st', true, function (v) {
		treectl.gentab(get_evpath(), treectl.lsc);
	});
	setwrap(bcfg_bind(r, 'wtree', 'wraptree', true, setwrap));
	setwrap(bcfg_bind(r, 'parpane', 'parpane', true, onscroll));
	bcfg_bind(r, 'htree', 'hovertree', false, reload_tree);
	bcfg_bind(r, 'ask', 'bd_ask', MOBILE && FIREFOX);
	ebi('bd_lim').value = r.lim = icfg_get('bd_lim');
	ebi('bd_lim').oninput = function (e) {
		var n = parseInt(this.value);
		swrite('bd_lim', r.lim = (isNum(n) ? n : 0) || 1000);
	};
	r.nvis = r.lim;

	ldks = jread('dks', []);
	for (var a = ldks.length - 1; a >= 0; a--) {
		var s = ldks[a],
			o = s.lastIndexOf('?');

		dks[s.slice(0, o)] = s.slice(o + 1);
	}

	function setwrap(v) {
		clmod(ebi('tree'), 'nowrap', !v);
		reload_tree();
	}
	setwrap(r.wtree);

	function setidxh(v) {
		if (!v == !/\bidxh=y\b/.exec('' + document.cookie))
			return;

		var xhr = new XHR();
		xhr.open('GET', SR + '/?setck=idxh=' + (v ? 'y' : 'n'), true);
		xhr.send();
	}
	setidxh(r.idxh);

	r.entree = function (e, nostore) {
		ev(e);
		entreed = true;
		if (!nostore)
			swrite('entreed', 'tree');

		get_tree("", get_evpath(), true);
		r.show();
	}

	r.show = function () {
		r.hidden = false;
		if (!entreed) {
			ebi('path').style.display = 'inline-block';
			return;
		}

		ebi('path').style.display = 'none';
		ebi('tree').style.display = 'block';
		window.addEventListener('scroll', onscroll);
		window.addEventListener('resize', onresize);
		onresize();
		aligngriditems();
	};

	r.detree = function (e) {
		ev(e);
		entreed = false;
		swrite('entreed', 'na');

		r.hide();
		ebi('path').style.display = '';
	}

	r.hide = function () {
		r.hidden = true;
		ebi('path').style.display = 'none';
		ebi('tree').style.display = 'none';
		ebi('wrap').style.marginLeft = '';
		window.removeEventListener('resize', onresize);
		window.removeEventListener('scroll', onscroll);
		aligngriditems();
	}

	function unmenter() {
		if (mentered) {
			mentered.style.position = '';
			mentered = null;
		}
	}

	r.textmode = function (ya) {
		var chg = !r.texts != !ya;
		r.texts = ya;
		ebi('docul').style.display = ya ? '' : 'none';
		ebi('treeul').style.display = ebi('treepar').style.display = ya ? 'none' : '';
		clmod(ebi('filetree'), 'on', ya);
		if (chg)
			tree_scrollto();
	};
	ebi('filetree').onclick = function (e) {
		ev(e);
		r.textmode(!r.texts);
	};
	r.textmode(false);

	function onscroll() {
		unmenter();
		onscroll2();
	}

	function onscroll2() {
		if (!entreed || r.hidden || document.visibilityState == 'hidden')
			return;

		var tree = ebi('tree'),
			wrap = ebi('wrap'),
			wraptop = null,
			atop = wrap.getBoundingClientRect().top,
			winh = window.innerHeight,
			parp = ebi('treepar'),
			y = tree.scrollTop,
			w = tree.offsetWidth;

		if (atop !== prev_atop || winh !== prev_winh)
			wraptop = Math.floor(wrap.offsetTop);

		if (r.parpane && r.pdir.length && w != r.pdirw) {
			r.pdirw = w;
			compy();
		}

		if (!r.parpane || !r.pdir.length || y >= r.pdir.slice(-1)[0][0] || y <= r.pdir[0][0]) {
			clmod(parp, 'off', 1);
			r.pdirh = null;
		}
		else {
			var h1 = [], h2 = [], els = [];
			for (var a = 0; a < r.pdir.length; a++) {
				if (r.pdir[a][0] > y)
					break;

				var e2 = r.pdir[a][1], e1 = e2.previousSibling;
				h1.push('<li>' + e1.outerHTML + e2.outerHTML + '<ul>');
				h2.push('</ul></li>');
				els.push([e1, e2]);
			}
			h1 = h1.join('\n') + h2.join('\n');
			if (h1 != r.pdirh) {
				r.pdirh = h1;
				parp.innerHTML = h1;
				clmod(parp, 'off');
				var els = QSA('#treepar a');
				for (var a = 0, aa = els.length; a < aa; a++)
					els[a].onclick = bad_proxy;
			}
			y = ebi('treeh').offsetHeight;
			if (!fixedpos)
				y += tree.offsetTop - yscroll();

			y = (y - 3) + 'px';
			if (parp.style.top != y)
				parp.style.top = y;
		}

		if (wraptop === null)
			return;

		prev_atop = atop;
		prev_winh = winh;

		if (fixedpos && atop >= 0) {
			tree.style.position = 'absolute';
			tree.style.bottom = '';
			fixedpos = false;
		}
		else if (!fixedpos && atop < 0) {
			tree.style.position = 'fixed';
			tree.style.height = 'auto';
			fixedpos = true;
		}

		if (fixedpos) {
			tree.style.top = Math.max(0, parseInt(atop)) + 'px';
		}
		else {
			var top = Math.max(0, wraptop),
				treeh = winh - atop;

			tree.style.top = top + 'px';
			tree.style.height = treeh < 10 ? '' : Math.floor(treeh) + 'px';
		}
	}
	timer.add(onscroll2, true);

	function onresize(e) {
		if (!entreed || r.hidden)
			return;

		var q = '#tree',
			nq = -3;

		while (r.dyn) {
			nq++;
			q += '>ul>li';
			if (!QS(q))
				break;
		}
		nq = Math.max(nq, get_evpath().split('/').length - 2);
		var iw = (treesz + Math.max(0, nq)),
			w = iw + 'em',
			w2 = (iw + 2) + 'em';

		try {
			document.documentElement.style.setProperty('--nav-sz', w);
		}
		catch (ex) { }
		ebi('tree').style.width = w;
		ebi('wrap').style.marginLeft = w2;
		onscroll();
	}

	r.find = function (txt) {
		var ta = QSA('#treeul a.hl+ul>li>a+a');
		for (var a = 0, aa = ta.length; a < aa; a++)
			if (ta[a].textContent == txt)
				return ta[a];
	};

	r.goto = function (url, push, back) {
		if (!url || !url.startsWith('/'))
			url = get_evpath() + (url || '');

		get_tree("", url, true);
		r.reqls(url, push, back);
	};

	function get_tree(top, dst, rst) {
		var xhr = new XHR(),
			m = /[?&](k=[^&#]+)/.exec(dst),
			k = m ? '&' + m[1] : dk ? '&k=' + dk : '';

		xhr.top = top;
		xhr.dst = dst;
		xhr.rst = rst;
		xhr.ts = Date.now();
		xhr.open('GET', addq(dst, 'tree=' + top + (r.dots ? '&dots' : '') + k), true);
		xhr.onload = xhr.onerror = recvtree;
		xhr.send();
		enspin('#tree');
	}

	function recvtree() {
		if (!xhrchk(this, L.tl_xe1, L.tl_xe2))
			return;

		try {
			var res = JSON.parse(this.responseText);
		}
		catch (ex) {
			return toast.err(30, "bad <code>?tree</code> reply;\nexpected json, got this:\n\n" + esc(this.responseText + ''));
		}
		rendertree(res, this.ts, this.top, this.dst, this.rst);
	}

	function rendertree(res, ts, top0, dst, rst) {
		var cur = ebi('treeul').getAttribute('ts');
		if (cur && parseInt(cur) > ts + 20 && QS('#treeul>li>a+a')) {
			console.log("reject tree; " + cur + " / " + (ts - cur));
			return;
		}
		ebi('treeul').setAttribute('ts', ts);

		var top = (top0 == '.' ? dst : top0).split('?')[0],
			name = uricom_dec(top.split('/').slice(-2)[0]),
			rtop = top.replace(/^\/+/, ""),
			html = parsetree(res, rtop);

		if (!top0) {
			html = '<li><a href="#">-</a><a href="/">[root]</a>\n<ul>' + html;
			if (rst || !ebi('treeul').getElementsByTagName('li').length)
				ebi('treeul').innerHTML = html + '</ul></li>';
		}
		else {
			html = '<a href="#">-</a><a href="' +
				esc(top) + '">' + esc(name) +
				"</a>\n<ul>\n" + html + "</ul>";

			var links = QSA('#treeul a+a');
			for (var a = 0, aa = links.length; a < aa; a++) {
				if (links[a].getAttribute('href').split('?')[0] == top) {
					var o = links[a].parentNode;
					if (!o.getElementsByTagName('li').length)
						o.innerHTML = html;
				}
			}
		}
		despin('#tree');

		try {
			QS('#treeul>li>a+a').textContent = '[root]';
		}
		catch (ex) {
			console.log('got no root yet');
			r.dir_cb = null;
			return;
		}

		reload_tree();
		var fun = r.dir_cb;
		if (fun) {
			r.dir_cb = null;
			try {
				fun();
			}
			catch (ex) {
				console.log("dir_cb failed", ex);
			}
		}
	}

	function reload_tree() {
		var cdir = r.nextdir || get_vpath(),
			cevp = get_evpath(),
			links = QSA('#treeul a+a'),
			nowrap = QS('#tree.nowrap') && QS('#hovertree.on'),
			act = null;

		for (var a = 0, aa = links.length; a < aa; a++) {
			var qhref = links[a].getAttribute('href'),
				ehref = qhref.split('?')[0],
				href = uricom_dec(ehref),
				cl = '';

			if (dk && ehref == cevp && !/[?&]k=/.exec(qhref))
				links[a].setAttribute('href', addq(qhref, 'k=' + dk));

			if (href == cdir) {
				act = links[a];
				cl = 'hl';
			}
			else if (cdir.startsWith(href)) {
				cl = 'par';
			}

			links[a].className = cl;
			links[a].onclick = r.treego;
			links[a].onmouseenter = nowrap ? menter : null;
			links[a].onmouseleave = nowrap ? mleave : null;
		}
		links = QSA('#treeul li>a:first-child');
		for (var a = 0, aa = links.length; a < aa; a++) {
			links[a].setAttribute('dst', links[a].nextSibling.getAttribute('href'));
			links[a].onclick = treegrow;
		}
		ebi('tree').onscroll = nowrap ? unmenter : null;
		r.pdir = [];
		try {
			while (act) {
				r.pdir.unshift([-1, act]);
				act = act.parentNode.parentNode.closest('li').querySelector('a:first-child+a');
			}
		}
		catch (ex) { }
		r.pdir.shift();
		r.pdirw = -1;
		onresize();
	}

	function compy() {
		for (var a = 0; a < r.pdir.length; a++)
			r.pdir[a][0] = r.pdir[a][1].offsetTop;

		var ofs = 0;
		for (var a = 0; a < r.pdir.length - 1; a++) {
			ofs += r.pdir[a][1].offsetHeight + 1;
			r.pdir[a + 1][0] -= ofs;
		}
	}

	function menter(e) {
		var p = this.offsetParent,
			pp = p.offsetParent,
			ppy = pp.offsetTop,
			y = this.offsetTop + p.offsetTop + ppy - p.scrollTop - pp.scrollTop - (ppy ? document.documentElement.scrollTop : 0);

		this.style.top = y + 'px';
		this.style.position = 'fixed';
		mentered = this;
	}

	function mleave(e) {
		this.style.position = '';
		mentered = null;
	}

	function bad_proxy(e) {
		if (ctrl(e))
			return true;

		ev(e);
		var dst = this.getAttribute('dst'),
			k = dst ? 'dst' : 'href',
			v = dst ? dst : this.getAttribute('href'),
			els = QSA('#treeul a');

		for (var a = 0, aa = els.length; a < aa; a++)
			if (els[a].getAttribute(k) === v)
				return els[a].click();
	}

	r.treego = function (e) {
		if (ctrl(e))
			return true;

		ev(e);
		if (this.className == 'hl' &&
			this.previousSibling.textContent == '-') {
			treegrow.call(this.previousSibling, e);
			return;
		}
		var href = this.getAttribute('href');
		if (R && !href.startsWith(SR)) {
			location = href;
			return;
		}
		r.reqls(href, true);
		r.dir_cb = tree_scrollto;
		thegrid.setvis(true);
	}

	r.reqls = function (url, hpush, back, hydrate) {
		if (IE && !history.pushState)
			return window.location = url;

		var xhr = new XHR(),
			m = /[?&](k=[^&#]+)/.exec(url),
			k = m ? '&' + m[1] : dk ? '&k=' + dk : '';

		xhr.top = url.split('?')[0];
		xhr.back = back
		xhr.hpush = hpush;
		xhr.hydrate = hydrate;
		xhr.ts = Date.now();
		xhr.open('GET', xhr.top + '?ls' + (r.dots ? '&dots' : '') + k, true);
		xhr.onload = xhr.onerror = recvls;
		xhr.send();

		r.nvis = r.lim;
		r.sb_msg = false;
		r.nextdir = xhr.top;
		clearTimeout(mpl.t_eplay);
		enspin('#tree');
		enspin(thegrid.en ? '#gfiles' : '#files');
		window.removeEventListener('scroll', r.tscroll);
	}

	function treegrow(e) {
		ev(e);
		if (this.textContent == '-') {
			while (this.nextSibling.nextSibling) {
				var rm = this.nextSibling.nextSibling;
				rm.parentNode.removeChild(rm);
			}
			this.textContent = '+';
			onresize();
			return;
		}
		var dst = this.getAttribute('dst');
		get_tree('.', dst);
	}

	function recvls() {
		if (!xhrchk(this, L.fl_xe1, L.fl_xe2))
			return;

		r.nextdir = null;
		var cdir = get_evpath(),
			lfiles = ebi('files'),
			cur = lfiles.getAttribute('ts');

		if (cur && parseInt(cur) > this.ts) {
			console.log("reject ls");
			return;
		}
		lfiles.setAttribute('ts', this.ts);

		try {
			var res = JSON.parse(this.responseText);
		}
		catch (ex) {
			if (r.ls_cb) {
				r.ls_cb = null;
				return toast.inf(10, L.mm_nof);
			}

			if (!this.hydrate) {
				location = this.top;
				return;
			}

			return toast.err(30, "bad <code>?ls</code> reply;\nexpected json, got this:\n\n" + esc(this.responseText + ''));
		}

		if (r.chk_index_html(this.top, res))
			return;

		for (var a = 0; a < res.files.length; a++)
			if (res.files[a].tags === undefined)
				res.files[a].tags = {};

		read_dsort(res.dsort);
		dcrop = res.dcrop;
		dth3x = res.dth3x;
		dk = res.dk;

		srvinf = res.srvinf;
		try {
			ebi('srv_info').innerHTML = ebi('srv_info2').innerHTML = '<span>' + res.srvinf + '</span>';
		}
		catch (ex) { }

		if (this.hpush && !showfile.active())
			hist_push(this.top + (dk ? '?k=' + dk : ''));

		if (!this.back) {
			var dirs = [];
			for (var a = 0; a < res.dirs.length; a++) {
				var dh = res.dirs[a].href,
					dn = dh.split('/')[0].split('?')[0],
					m = /[?&](k=[^&#]+)/.exec(dh);

				if (m)
					dn += '?' + m[1];

				dirs.push(dn);
			}

			rendertree({ "a": dirs }, this.ts, ".", get_evpath() + (dk ? '?k=' + dk : ''));
		}

		r.gentab(this.top, res);
		despin('#tree');
		despin('#files');
		despin('#gfiles');

		var lg0 = res.logues ? res.logues[0] || "" : "",
			lg1 = res.logues ? res.logues[1] || "" : "",
			dirchg = get_evpath() != cdir;

		if (lg1 === Ls.eng.f_empty)
			lg1 = L.f_empty;

		sandbox(ebi('pro'), sb_lg, '', lg0);
		if (dirchg)
			sandbox(ebi('epi'), sb_lg, '', lg1);

		clmod(ebi('epi'), 'mdo');
		if (res.readme && treectl.ireadme)
			show_readme(res.readme);
		else if (!dirchg)
			sandbox(ebi('epi'), sb_lg, '', lg1);

		if (this.hpush && !this.back) {
			var ofs = ebi('wrap').offsetTop;
			if (document.documentElement.scrollTop > ofs)
				document.documentElement.scrollTop = ofs;
		}

		wintitle();
		var fun = r.ls_cb;
		if (fun) {
			r.ls_cb = null;
			fun();
		}
	}

	r.chk_index_html = function (top, res) {
		if (!r.idxh || !res || !res.files || noih)
			return;

		for (var a = 0; a < res.files.length; a++)
			if (/^index.html?(\?|$)/i.exec(res.files[a].href)) {
				location = vjoin(top, res.files[a].href);
				return true;
			}
	};

	r.gentab = function (top, res) {
		var nodes = res.dirs.concat(res.files),
			html = mk_files_header(res.taglist),
			sel = r.lsc === res ? msel.getsel() : [],
			ae = document.activeElement,
			cid = null,
			plain = [],
			seen = {};

		if (ae && /^tr$/i.exec(ae.nodeName))
			if (ae = ae.querySelector('a[id]'))
				cid = ae.getAttribute('id');

		var m = /[?&]k=([^&]+)/.exec(location.search);
		if (m)
			memo_dk(top, m[1]);

		r.lsc = res;
		if (res.unlist) {
			var ptn = new RegExp(res.unlist);
			for (var a = nodes.length - 1; a >= 0; a--)
				if (ptn.exec(nodes[a].href.split('?')[0]))
					nodes.splice(a, 1);
		}
		nodes = sortfiles(nodes);
		window.removeEventListener('scroll', r.tscroll);
		r.trunc = nodes.length > r.nvis && location.hash.length < 2;
		if (r.trunc) {
			for (var a = r.lim; a < nodes.length; a++) {
				var tn = nodes[a],
					tns = Object.keys(tn.tags || {});

				plain.push(uricom_dec(tn.href.split('?')[0]));

				for (var b = 0; b < tns.length; b++)
					if (has(res.taglist, tns[b]))
						plain.push(tn.tags[tns[b]]);
			}
			nodes = nodes.slice(0, r.nvis);
		}

		showfile.files = [];
		html.push('<tbody>');
		for (var a = 0; a < nodes.length; a++) {
			var tn = nodes[a],
				bhref = tn.href.split('?')[0],
				fname = uricom_dec(bhref),
				hname = esc(fname),
				id = 'f-' + ('00000000' + crc32(fname)).slice(-8),
				lang = showfile.getlang(fname);

			while (seen[id])  // ejyefs ev69gg y9j8sg .opus
				id += 'a';
			seen[id] = 1;

			if (lang) {
				showfile.files.push({ 'id': id, 'name': fname });
				if (lang == 'md')
					tn.href = addq(tn.href, 'v');
			}

			if (tn.lead == '-')
				tn.lead = '<a href="?doc=' + bhref + '" id="t' + id +
					'" class="doc' + (lang ? ' bri' : '') +
					'" hl="' + id + '" name="' + hname + '">-txt-</a>';

			var cl = /\.PARTIAL$/.exec(fname) ? ' class="fade"' : '',
				ln = ['<tr' + cl + '><td>' + tn.lead + '</td><td><a href="' +
					top + tn.href + '" id="' + id + '">' + hname + '</a>', tn.sz];

			for (var b = 0; b < res.taglist.length; b++) {
				var k = res.taglist[b],
					v = (tn.tags || {})[k] || "",
					sv = null;

				if (k == ".dur")
					sv = v ? s2ms(v) : "";
				else if (k == ".up_at")
					sv = v ? unix2iso(v) : "";
				else {
					ln.push(v);
					continue;
				}
				ln[ln.length - 1] += '</td><td sortv="' + v + '">' + sv;
			}
			ln = ln.concat([tn.ext, unix2iso(tn.ts)]).join('</td><td>');
			html.push(ln + '</td></tr>');
		}
		html.push('</tbody>');
		html = html.join('\n');
		set_files_html(html);
		if (r.trunc) {
			r.setlazy(plain);
			if (!r.ask) {
				window.addEventListener('scroll', r.tscroll);
				setTimeout(r.tscroll, 100);
			}
		}
		else ebi('lazy').innerHTML = '';

		function asdf() {
			showfile.mktree();
			mukey.render();
			reload_tree();
			reload_browser();
			tree_scrollto();
			if (res.acct) {
				acct = res.acct;
				have_up2k_idx = res.idx;
				have_tags_idx = res.itag;
				lifetime = res.lifetime;
				apply_perms(res);
				fileman.render();
			}
			if (sel.length)
				msel.loadsel(sel);
			else
				msel.origin_id(null);

			if (cid) try {
				ebi(cid).closest('tr').focus();
			} catch (ex) { }

			setTimeout(eval_hash, 1);
		}

		var m = scan_hash(hash0),
			url = null;

		if (m) {
			url = ebi(m[1]);
			if (url) {
				url = url.href;
				var mt = m[0] == 'a' ? 'audio' : /\.(webm|mkv)($|\?)/i.exec(url) ? 'video' : 'image'
				if (mt == 'image') {
					url = addq(url, 'cache');
					console.log(url);
					new Image().src = url;
				}
			}
		}

		if (url) setTimeout(asdf, 1); else asdf();
	}

	r.hydrate = function () {
		qsr('#bbsw');
		if (ls0 === null) {
			var xhr = new XHR();
			xhr.open('GET', SR + '/?setck=js=y', true);
			xhr.send();

			r.ls_cb = showfile.addlinks;
			return r.reqls(get_evpath(), false, undefined, true);
		}

		var top = get_evpath();
		if (r.chk_index_html(top, ls0))
			return;

		r.gentab(top, ls0);
		pbar.onresize();
		vbar.onresize();
		showfile.addlinks();
		setTimeout(eval_hash, 1);
	};

	function memo_dk(vp, k) {
		dks[vp] = k;
		var lv = vp + "?" + k;
		if (has(ldks, lv))
			return;

		ldks.unshift(lv);
		if (ldks.length > 32) {
			var keep = [], evp = get_evpath();
			for (var a = 0; a < ldks.length; a++) {
				var s = ldks[a];
				if (evp.startsWith(s.replace(/\?[^?]+$/, '')))
					keep.push(s);
			}
			var lim = 32 - keep.length;
			for (var a = 0; a < lim; a++) {
				if (!has(keep, ldks[a]))
					keep.push(ldks[a])
			}
			ldks = keep;
		}
		jwrite('dks', ldks);
	}

	r.setlazy = function (plain) {
		var html = ['<div id="plazy">', esc(plain.join(' ')), '</div>'],
			all = r.lsc.files.length + r.lsc.dirs.length,
			nxt = r.nvis * 4;

		if (r.ask)
			html.push((nxt >= all ? L.fbd_all : L.fbd_more).format(r.nvis, all, nxt));

		ebi('lazy').innerHTML = html.join('\n');

		try {
			ebi('bd_all').onclick = function (e) {
				ev(e);
				r.showmore(all);
			};
			ebi('bd_more').onclick = function (e) {
				ev(e);
				r.showmore(nxt);
			};
		}
		catch (ex) { }
	};

	r.showmore = function (n) {
		window.removeEventListener('scroll', r.tscroll);
		console.log('nvis {0} -> {1}'.format(r.nvis, n));
		r.nvis = n;
		ebi('lazy').innerHTML = '';
		ebi('wrap').style.opacity = 0.4;
		document.documentElement.scrollLeft = 0;
		setTimeout(function () {
			r.gentab(get_evpath(), r.lsc);
			ebi('wrap').style.opacity = 'unset';
		}, 1);
	};

	r.tscroll = function () {
		var el = r.trunc ? ebi('plazy') : null;
		if (!el || ebi('lazy').style.display || ebi('unsearch'))
			return;

		var sy = yscroll() + window.innerHeight,
			ty = el.offsetTop;

		if (sy <= ty)
			return;

		window.removeEventListener('scroll', r.tscroll);

		var all = r.lsc.files.length + r.lsc.dirs.length;
		if (r.nvis * 16 <= all) {
			console.log("{0} ({1} * 16) <= {2}".format(r.nvis * 16, r.nvis, all));
			r.showmore(r.nvis * 4);
		}
		else {
			console.log("{0} ({1} * 16) > {2}".format(r.nvis * 16, r.nvis, all));
			r.showmore(all);
		}
	};

	function parsetree(res, top) {
		var ret = '';
		for (var a = 0; a < res.a.length; a++) {
			if (res.a[a] !== '')
				res['k' + res.a[a]] = 0;
		}
		delete res['a'];
		var keys = Object.keys(res);
		keys.sort(function (a, b) { return a.localeCompare(b); });
		for (var a = 0; a < keys.length; a++) {
			var kk = keys[a],
				m = /(\?k=[^\n]+)/.exec(kk),
				kdk = m ? m[1] : '',
				ks = kk.replace(kdk, '').slice(1),
				ded = ks.endsWith('\n'),
				k = uricom_sdec(ded ? ks.replace(/\n$/, '') : ks),
				hek = esc(k[0]),
				uek = k[1] ? uricom_enc(k[0], true) : k[0],
				url = '/' + (top ? top + uek : uek) + '/',
				sym = res[kk] ? '-' : '+',
				link = '<a href="#">' + sym + '</a><a href="' +
					url + kdk + '">' + hek + '</a>';

			if (res[kk]) {
				var subtree = parsetree(res[kk], url.slice(1));
				ret += '<li>' + link + '\n<ul>\n' + subtree + '</ul></li>\n';
			}
			else {
				ret += (ded ? '<li class="offline">' : '<li>') + link + '</li>\n';
			}
		}
		return ret;
	}

	function scaletree(e) {
		ev(e);
		treesz += parseInt(this.getAttribute("step"));
		if (!isNum(treesz))
			treesz = 16;

		treesz = clamp(treesz, 2, 120);
		swrite('treesz', treesz);
		onresize();
	}

	ebi('entree').onclick = r.entree;
	ebi('detree').onclick = r.detree;
	ebi('visdir').onclick = tree_scrollto;
	ebi('twig').onclick = scaletree;
	ebi('twobytwo').onclick = scaletree;

	var cs = sread('entreed'),
		vw = window.innerWidth / parseFloat(getComputedStyle(document.body)['font-size']);

	if (cs == 'tree' || (cs != 'na' && vw >= 60))
		r.entree(null, true);

	r.onpopfun = function (e) {
		console.log("h-pop " + e.state);
		if (!e.state)
			return;

		var url = new URL(e.state, "https://" + location.host),
			req = url.pathname,
			hbase = req,
			cbase = location.pathname,
			mdoc = /[?&]doc=/.exec('' + url),
			mdk = /[?&](k=[^&#]+)/.exec('' + url);

		if (mdoc && hbase == cbase)
			return showfile.show(hbase + showfile.sname(url.search), true);

		if (mdk)
			req += '?' + mdk[1];

		r.goto(req, false, true);
	};

	var evp = get_evpath() + (dk ? '?k=' + dk : '');
	hist_replace(evp + location.hash);
	r.onscroll = onscroll;
	return r;
})();


function enspin(sel) {
	despin(sel);
	var d = mknod('div');
	d.className = 'dumb_loader_thing';
	d.innerHTML = '🌲';
	var tgt = QS(sel);
	tgt.insertBefore(d, tgt.childNodes[0]);
}


function despin(sel) {
	var o = QSA(sel + '>.dumb_loader_thing');
	for (var a = o.length - 1; a >= 0; a--)
		o[a].parentNode.removeChild(o[a]);
}


var wfp_debounce = (function () {
	var r = { 'n': 0, 't': 0 };

	r.hide = function () {
		if (!sb_lg && !sb_md)
			return;

		if (++r.n <= 1) {
			r.n = 1;
			clearTimeout(r.t);
			r.t = setTimeout(r.reset, 300);
			ebi('wfp').style.opacity = 0.1;
		}
	};
	r.show = function () {
		if (!sb_lg && !sb_md)
			return;

		if (--r.n <= 0) {
			r.n = 0;
			clearTimeout(r.t);
			ebi('wfp').style.opacity = 'unset';
		}
	};
	r.reset = function () {
		r.n = 0;
		r.show();
	};
	return r;
})();


function apply_perms(res) {
	perms = res.perms || [];

	var a = QS('#ops a[data-dest="up2k"]');
	if (have_up2k_idx) {
		a.removeAttribute('data-perm');
		a.setAttribute('tt', L.ot_u2i);
	}
	else {
		a.setAttribute('data-perm', 'write');
		a.setAttribute('tt', L.ot_u2w);
	}
	clmod(ebi('srch_form'), 'tags', have_tags_idx);

	a.style.display = '';
	tt.att(QS('#ops'));

	var axs = [],
		aclass = '>',
		chk = ['read', 'write', 'move', 'delete', 'get', 'admin'];

	for (var a = 0; a < chk.length; a++)
		if (has(perms, chk[a]))
			axs.push(chk[a].slice(0, 1).toUpperCase() + chk[a].slice(1));

	axs = axs.join('-');
	if (perms.length == 1) {
		aclass = ' class="warn">';
		axs += '-Only';
	}

	ebi('acc_info').innerHTML = '<span id="srv_info2"><span>' + srvinf +
		'</span></span><span' + aclass + axs + L.access + '</span>' + (acct != '*' ?
			'<form id="flogout" method="post" enctype="multipart/form-data"><input type="hidden" name="act" value="logout" /><input id="blogout" type="submit" value="' + (window.is_idp ? '' : L.logout) + acct + '"></form>' :
			'<a href="?h">Login</a>');

	var o = QSA('#ops>a[data-perm]');
	for (var a = 0; a < o.length; a++) {
		var display = '';
		var needed = o[a].getAttribute('data-perm').split(' ');
		for (var b = 0; b < needed.length; b++) {
			if (!has(perms, needed[b])) {
				display = 'none';
			}
		}
		o[a].style.display = display;
	}

	var o = QSA('#ops>a[data-dep], #u2conf td[data-dep]');
	for (var a = 0; a < o.length; a++)
		o[a].style.display = (
			o[a].getAttribute('data-dep') != 'idx' || have_up2k_idx
		) ? '' : 'none';

	var act = QS('#ops>a.act');
	if (act && act.style.display === 'none')
		goto();

	document.body.setAttribute('perms', perms.join(' '));

	var have_write = has(perms, "write"),
		have_read = has(perms, "read"),
		de = document.documentElement,
		tds = QSA('#u2conf td');

	clmod(de, "read", have_read);
	clmod(de, "write", have_write);
	clmod(de, "nread", !have_read);
	clmod(de, "nwrite", !have_write);

	for (var a = 0; a < tds.length; a++) {
		tds[a].style.display =
			(have_write || tds[a].getAttribute('data-perm') == 'read') ?
				'table-cell' : 'none';
	}
	if (res.frand)
		ebi('u2rand').parentNode.style.display = 'none';

	u2ts = res.u2ts;
	if (up2k)
		up2k.set_fsearch();

	ebi('widget').style.display = have_read ? '' : 'none';
	thegrid.setvis();
	if (!have_read && have_write)
		goto('up2k');
}


function tr2id(tr) {
	try {
		return tr.cells[1].querySelector('a[id]').getAttribute('id');
	}
	catch (ex) {
		return null;
	}
}


function find_file_col(txt) {
	var i = -1,
		min = false,
		tds = ebi('files').tHead.getElementsByTagName('th');

	for (var a = 0; a < tds.length; a++) {
		var spans = tds[a].getElementsByTagName('span');
		if (spans.length && spans[0].textContent == txt) {
			min = (tds[a].className || '').indexOf('min') !== -1;
			i = a;
			break;
		}
	}

	if (i == -1)
		return;

	return [i, min];
}


function mk_files_header(taglist) {
	var html = [
		'<thead><tr>',
		'<th name="lead"><span>c</span></th>',
		'<th name="href"><span>File Name</span></th>',
		'<th name="sz" sort="int"><span>Size</span></th>'
	];
	for (var a = 0; a < taglist.length; a++) {
		var tag = taglist[a],
			c1 = tag.slice(0, 1).toUpperCase();

		tag = c1 + tag.slice(1);
		if (c1 == '.')
			tag = '<th name="tags/' + tag + '" sort="int"><span>' + tag.slice(1);
		else
			tag = '<th name="tags/' + tag + '"><span>' + tag;

		html.push(tag + '</span></th>');
	}
	html = html.concat([
		'<th name="ext"><span>T</span></th>',
		'<th name="ts"><span>Date</span></th>',
		'</tr></thead>',
	]);
	return html;
}


var filecols = (function () {
	var r = { 'picking': false };
	var hidden = jread('filecols', []);

	r.add_btns = function () {
		var ths = QSA('#files>thead th>span');
		for (var a = 0, aa = ths.length; a < aa; a++) {
			var th = ths[a].parentElement,
				toh = ths[a].outerHTML, // !ff10
				ttv = L.cols[ths[a].textContent];

			ttv = (ttv ? ttv + '; ' : '') + 'id=<code>' + th.getAttribute('name') + '</code>';
			if (!MOBILE && toh) {
				th.innerHTML = '<div class="cfg"><a href="#">-</a></div>' + toh;
				th.getElementsByTagName('a')[0].onclick = ev_row_tgl;
			}
			if (ttv) {
				th.setAttribute("tt", ttv);
				th.setAttribute("ttd", "u");
				th.setAttribute("ttm", "12");
			}
		}
	};

	function hcols_click(e) {
		ev(e);
		var t = e.target;
		if (t.tagName != 'A')
			return;

		r.toggle(t.textContent);
	}

	r.uivis = function () {
		var hcols = ebi('hcols');
		hcols.previousSibling.style.display = hcols.style.display = ((!thegrid || !thegrid.en) && (hidden.length || MOBILE)) ? 'block' : 'none';
	};

	r.set_style = function (unhide) {
		hidden.sort();

		if (!unhide)
			unhide = [];

		var html = [],
			hcols = ebi('hcols');

		for (var a = 0; a < hidden.length; a++) {
			var ttv = L.cols[hidden[a]],
				tta = ttv ? ' tt="' + ttv + '">' : '>';

			html.push('<a href="#" class="btn"' + tta + esc(hidden[a]) + '</a>');
		}
		hcols.innerHTML = html.join('\n');
		hcols.onclick = hcols_click;
		r.uivis();
		r.add_btns();

		var ohidden = [],
			ths = QSA('#files>thead th'),
			ncols = ths.length;

		for (var a = 0; a < ncols; a++) {
			var span = ths[a].getElementsByTagName('span');
			if (span.length <= 0)
				continue;

			var name = span[0].textContent,
				cls = false;

			if (has(hidden, name) && !has(unhide, name)) {
				ohidden.push(a);
				cls = true;
			}
			clmod(ths[a], 'min', cls)
		}
		for (var a = 0; a < ncols; a++) {
			var cls = has(ohidden, a) ? 'min' : '',
				tds = QSA('#files>tbody>tr>td:nth-child(' + (a + 1) + ')');

			for (var b = 0, bb = tds.length; b < bb; b++)
				tds[b].className = cls;
		}
		if (tt) {
			tt.att(ebi('hcols'));
			tt.att(QS('#files>thead'));
		}
	};

	r.setvis = function (name, vis) {
		var ofs = hidden.indexOf(name);
		if (ofs !== -1 && vis != 0)
			hidden.splice(ofs, 1);
		else if (vis != 1) {
			if (!sread("chide_ok")) {
				return modal.confirm(L.f_chide.format(name), function () {
					swrite("chide_ok", 1);
					r.toggle(name);
				}, null);
			}
			hidden.push(name);
		}
		jwrite("filecols", hidden);
		r.set_style();
	};
	r.show = function (name) { r.setvis(name, 1); };
	r.hide = function (name) { r.setvis(name, 0); };
	r.toggle = function (name) { r.setvis(name, -1); };

	ebi('hcolsr').onclick = function (e) {
		ev(e);
		r.reset(true);
	};

	if (MOBILE)
		ebi('hcolsh').onclick = function (e) {
			ev(e);
			if (r.picking)
				return r.unpick();

			var lbs = QSA('#files>thead th');
			for (var a = 0; a < lbs.length; a++) {
				lbs[a].onclick = function (e) {
					ev(e);
					if (toast.tag == 'pickhide')
						toast.hide();

					r.hide(e.target.textContent);
				};
			};
			r.picking = true;
			clmod(ebi('files'), 'hhpick', 1);
			toast.inf(0, L.cl_hpick, 'pickhide');
		};

	r.unpick = function () {
		r.picking = false;
		toast.inf(5, L.cl_hcancel);

		clmod(ebi('files'), 'hhpick');

		var lbs = QSA('#files>thead th');
		for (var a = 0; a < lbs.length; a++)
			lbs[a].onclick = null;
	};

	r.reset = function (force) {
		if (force || JSON.stringify(def_hcols) != sread('hfilecols')) {
			console.log("applying default hidden-cols");
			hidden = [];
			jwrite('hfilecols', def_hcols);
			for (var a = 0; a < def_hcols.length; a++) {
				var t = def_hcols[a];
				t = t.slice(0, 1).toUpperCase() + t.slice(1);
				if (t.startsWith("."))
					t = t.slice(1);

				if (hidden.indexOf(t) == -1)
					hidden.push(t);
			}
			jwrite("filecols", hidden);
		}
		r.set_style();
	}
	r.reset();

	try {
		var ci = find_file_col('dur'),
			i = ci[0],
			rows = ebi('files').tBodies[0].rows;

		for (var a = 0, aa = rows.length; a < aa; a++) {
			var c = rows[a].cells[i];
			if (c && c.textContent)
				c.textContent = s2ms(c.textContent);
		}
	}
	catch (ex) { }

	return r;
})();


var mukey = (function () {
	var maps = {
		"rekobo_alnum": [
			"1B ", "2B ", "3B ", "4B ", "5B ", "6B ", "7B ", "8B ", "9B ", "10B", "11B", "12B",
			"1A ", "2A ", "3A ", "4A ", "5A ", "6A ", "7A ", "8A ", "9A ", "10A", "11A", "12A"
		],
		"rekobo_classic": [
			"B  ", "F# ", "Db ", "Ab ", "Eb ", "Bb ", "F  ", "C  ", "G  ", "D  ", "A  ", "E  ",
			"Abm", "Ebm", "Bbm", "Fm ", "Cm ", "Gm ", "Dm ", "Am ", "Em ", "Bm ", "F#m", "Dbm"
		],
		"traktor_musical": [
			"B  ", "Gb ", "Db ", "Ab ", "Eb ", "Bb ", "F  ", "C  ", "G  ", "D  ", "A  ", "E  ",
			"Abm", "Ebm", "Bbm", "Fm ", "Cm ", "Gm ", "Dm ", "Am ", "Em ", "Bm ", "Gbm", "Dbm"
		],
		"traktor_sharps": [
			"B  ", "F# ", "C# ", "G# ", "D# ", "A# ", "F  ", "C  ", "G  ", "D  ", "A  ", "E  ",
			"G#m", "D#m", "A#m", "Fm ", "Cm ", "Gm ", "Dm ", "Am ", "Em ", "Bm ", "F#m", "C#m"
		],
		"traktor_open": [
			"6d ", "7d ", "8d ", "9d ", "10d", "11d", "12d", "1d ", "2d ", "3d ", "4d ", "5d ",
			"6m ", "7m ", "8m ", "9m ", "10m", "11m", "12m", "1m ", "2m ", "3m ", "4m ", "5m "
		]
	},
		defnot = 'rekobo_alnum';

	var map = {},
		html = [];

	for (var k in maps) {
		if (!maps.hasOwnProperty(k))
			continue;

		html.push(
			'<span><input type="radio" name="keytype" value="' + k + '" id="key_' + k + '">' +
			'<label for="key_' + k + '">' + k + '</label></span>');

		for (var a = 0; a < 24; a++)
			maps[k][a] = maps[k][a].trim();
	}
	ebi('key_notation').innerHTML = html.join('\n');

	function set_key_notation(e) {
		ev(e);
		var notation = this.getAttribute('value');
		load_notation(notation);
		try_render();
	}

	function load_notation(notation) {
		swrite("cpp_keynot", notation);
		map = {};
		var dst = maps[notation];
		for (var k in maps)
			if (k != notation && maps.hasOwnProperty(k))
				for (var a = 0; a < 24; a++)
					if (maps[k][a] != dst[a])
						map[maps[k][a]] = dst[a];
	}

	function render() {
		var ci = find_file_col('Key');
		if (!ci)
			return;

		var i = ci[0],
			min = ci[1],
			rows = ebi('files').tBodies[0].rows;

		if (min)
			for (var a = 0, aa = rows.length; a < aa; a++) {
				var c = rows[a].cells[i];
				if (!c)
					continue;

				var v = c.getAttribute('html');
				c.setAttribute('html', map[v] || v);
			}
		else
			for (var a = 0, aa = rows.length; a < aa; a++) {
				var c = rows[a].cells[i];
				if (!c)
					continue;

				var v = c.textContent;
				c.textContent = map[v] || v;
			}
	}

	function try_render() {
		try {
			render();
		}
		catch (ex) {
			console.log("key notation failed: " + ex);
		}
	}

	var notation = sread("cpp_keynot") || defnot;
	if (!maps[notation])
		notation = defnot;

	ebi('key_' + notation).checked = true;
	load_notation(notation);

	var o = QSA('#key_notation input');
	for (var a = 0; a < o.length; a++) {
		o[a].onchange = set_key_notation;
	}

	return {
		"render": try_render
	};
})();


var light, theme, themen;
var settheme = (function () {
	var ax = 'abcdefghijklmnopqrstuvwx';

	theme = sread('cpp_thm') || 'a';
	if (!/^[a-x][yz]/.exec(theme))
		theme = dtheme;

	themen = theme.split(/ /)[0];
	light = !!(theme.indexOf('y') + 1);

	function freshen() {
		var cl = document.documentElement.className;
		cl = cl.replace(/\b(light|dark|[a-z]{1,2})\b/g, '').replace(/ +/g, ' ');
		document.documentElement.className = cl + ' ' + theme + ' ';

		pbar.drawbuf();
		pbar.drawpos();
		vbar.draw();
		showfile.setstyle();
		bchrome();

		var html = [], itheme = ax.indexOf(theme[0]) * 2 + (light ? 1 : 0),
			names = ['classic dark', 'classic light', 'pm-monokai', 'flat light', 'vice', 'hotdog stand', 'hacker', 'hi-con'];

		for (var a = 0; a < themes; a++)
			html.push('<a href="#" class="btn tgl' + (a == itheme ? ' on' : '') +
				'" tt="' + (names[a] || 'custom') + '">' + a + '</a>');

		ebi('themes').innerHTML = html.join('');
		var btns = QSA('#themes a');
		for (var a = 0; a < themes; a++)
			btns[a].onclick = settheme;

		bcfg_set('light', light);
		tt.att(ebi('themes'));
	}

	function settheme(e) {
		var i = e;
		try { ev(e); i = e.target.textContent; } catch (ex) { }
		light = i % 2 == 1;
		var c = ax[Math.floor(i / 2)],
			l = light ? 'y' : 'z';
		theme = c + l + ' ' + c + ' ' + l;
		themen = c + l;
		swrite('cpp_thm', theme);
		freshen();
	}

	freshen();
	return settheme;
})();


(function () {
	function freshen() {
		lang = sread("cpp_lang", LANGS) || lang;
		var html = [];
		for (var k in Ls)
			if (Ls.hasOwnProperty(k))
				html.push('<a href="#" class="btn tgl' + (k == lang ? ' on' : '') +
					'" tt="' + Ls[k].tt + '">' + k + '</a>');

		ebi('langs').innerHTML = html.join('');
		var btns = QSA('#langs a');
		for (var a = 0, aa = btns.length; a < aa; a++)
			btns[a].onclick = setlang;
	}

	function setlang(e) {
		ev(e);
		var t = L.lang_set;
		L = Ls[this.textContent];
		swrite("cpp_lang", this.textContent);
		freshen();
		modal.confirm(L.lang_set + "\n\n" + t, location.reload.bind(location), null);
	};

	freshen();
})();


var arcfmt = (function () {
	if (!ebi('arc_fmt'))
		return { "render": function () { } };

	var html = [],
		fmts = [
			["tar", "tar", L.fz_tar],
			["pax", "tar=pax", L.fz_pax],
			["tgz", "tar=gz", L.fz_targz],
			["txz", "tar=xz", L.fz_tarxz],
			["zip", "zip=utf8", L.fz_zip8],
			["zip_dos", "zip", L.fz_zipd],
			["zip_crc", "zip=crc", L.fz_zipc]
		];

	for (var a = 0; a < fmts.length; a++) {
		var k = fmts[a][0];
		html.push(
			'<span><input type="radio" name="arcfmt" value="' + k + '" id="arcfmt_' + k + '" tt="' + fmts[a][2] + '">' +
			'<label for="arcfmt_' + k + '" tt="' + fmts[a][2] + '">' + k + '</label></span>');
	}
	ebi('arc_fmt').innerHTML = html.join('\n');

	var fmt = sread("arc_fmt");
	if (!ebi('arcfmt_' + fmt))
		fmt = "zip";

	ebi('arcfmt_' + fmt).checked = true;

	function render() {
		var arg = null,
			tds = QSA('#files tbody td:first-child a');

		for (var a = 0; a < fmts.length; a++)
			if (fmts[a][0] == fmt)
				arg = fmts[a][1];

		for (var a = 0, aa = tds.length; a < aa; a++) {
			var o = tds[a], txt = o.textContent, href = o.getAttribute('href');
			if (!/^(zip|tar|pax|tgz|txz)$/.exec(txt))
				continue;

			var m = /(.*[?&])(tar|zip)([^&#]*)(.*)$/.exec(href);
			if (!m)
				throw new Error('missing arg in url');

			o.setAttribute("href", m[1] + arg + m[4]);
			o.textContent = fmt.split('_')[0];
		}
		ebi('selzip').textContent = fmt.split('_')[0];
		ebi('selzip').setAttribute('fmt', arg);
	}

	function try_render() {
		try {
			render();
		}
		catch (ex) {
			console.log("arcfmt failed: " + ex);
		}
	}

	function change_fmt(e) {
		ev(e);
		fmt = this.getAttribute('value');
		swrite("arc_fmt", fmt);
		try_render();
	}

	var o = QSA('#arc_fmt input');
	for (var a = 0; a < o.length; a++) {
		o[a].onchange = change_fmt;
	}

	return {
		"render": try_render
	};
})();


var msel = (function () {
	var r = {};
	r.sel = null;
	r.all = null;
	r.so = null;  // selection origin
	r.pr = null;  // previous range

	r.load = function (reset) {
		if (r.sel && !reset)
			return;

		r.sel = [];
		if (r.all && r.all.length) {
			for (var a = 0; a < r.all.length; a++) {
				var ao = r.all[a];
				ao.sel = clgot(ebi(ao.id).closest('tr'), 'sel');
				if (ao.sel)
					r.sel.push(ao);
			}
			if (!reset)
				return;
		}

		r.all = [];
		var links = QSA('#files tbody td:nth-child(2) a:last-child'),
			is_srch = !!ebi('unsearch'),
			vbase = get_evpath();

		for (var a = 0, aa = links.length; a < aa; a++) {
			var qhref = links[a].getAttribute('href'),
				href = qhref.split('?')[0].replace(/\/$/, ""),
				item = {};

			item.id = links[a].getAttribute('id');
			item.sel = clgot(links[a].closest('tr'), 'sel');
			item.vp = href.indexOf('/') !== -1 ? href : vbase + href;

			if (dk) {
				var m = /[?&](k=[^&#]+)/.exec(qhref);
				item.q = m ? '?' + m[1] : '';
			}
			else item.q = '';

			r.all.push(item);
			if (item.sel)
				r.sel.push(item);

			if (!is_srch)
				links[a].closest('tr').setAttribute('tabindex', '0');
		}
	};

	r.loadsel = function (sel) {
		if (!sel || !r.so || !ebi(r.so))
			r.so = r.pr = null;

		r.sel = [];
		r.load();

		var vsel = new Set();
		for (var a = 0; a < sel.length; a++)
			vsel.add(sel[a].vp);

		for (var a = 0; a < r.all.length; a++)
			if (vsel.has(r.all[a].vp))
				clmod(ebi(r.all[a].id).closest('tr'), 'sel', 1);

		r.selui();
	};

	r.getsel = function () {
		r.load();
		return r.sel;
	};
	r.getall = function () {
		r.load();
		return r.all;
	};
	r.selui = function (reset) {
		r.sel = null;
		if (reset)
			r.all = null;

		clmod(ebi('wtoggle'), 'sel', r.getsel().length);
		thegrid.loadsel();
		fileman.render();
		showfile.updtree();
	};
	r.seltgl = function (e) {
		ev(e);
		var tr = this.parentNode,
			id = tr2id(tr);

		if ((treectl.csel || !thegrid.en || thegrid.sel) && e.shiftKey && r.so && id && r.so != id) {
			var o1 = -1, o2 = -1;
			for (a = 0; a < r.all.length; a++) {
				var ai = r.all[a].id;
				if (ai == r.so)
					o1 = a;
				if (ai == id)
					o2 = a;
			}
			var st = r.all[o1].sel;
			if (o1 > o2)
				o2 = [o1, o1 = o2][0];

			if (r.pr) {
				// invert previous range, in case it was narrowed
				for (var a = r.pr[0]; a <= r.pr[1]; a++)
					clmod(ebi(r.all[a].id).closest('tr'), 'sel', !st);

				// and invert current selection if repeated
				if (r.pr[0] === o1 && r.pr[1] === o2)
					st = !st;
			}

			for (var a = o1; a <= o2; a++)
				clmod(ebi(r.all[a].id).closest('tr'), 'sel', st);

			r.pr = [o1, o2];

			if (window.getSelection)
				window.getSelection().removeAllRanges();
		}
		else {
			clmod(tr, 'sel', 't');
			r.origin_tr(tr);
		}
		r.selui();
	};
	r.origin_tr = function (tr) {
		r.so = tr2id(tr);
		r.pr = null;
	};
	r.origin_id = function (id) {
		r.so = id;
		r.pr = null;
	};
	r.evsel = function (e, fun) {
		ev(e);
		r.so = r.pr = null;
		var trs = QSA('#files tbody tr');
		for (var a = 0, aa = trs.length; a < aa; a++)
			clmod(trs[a], 'sel', fun);
		r.selui();
	}
	ebi('selall').onclick = function (e) {
		r.evsel(e, "add");
	};
	ebi('selinv').onclick = function (e) {
		r.evsel(e, "t");
	};
	ebi('selzip').onclick = function (e) {
		ev(e);
		var sel = r.getsel(),
			arg = ebi('selzip').getAttribute('fmt'),
			frm = mknod('form'),
			txt = [];

		if (dk)
			arg += '&k=' + dk;

		for (var a = 0; a < sel.length; a++)
			txt.push(vsplit(sel[a].vp)[1]);

		txt = txt.join('\n');

		frm.setAttribute('action', '?' + arg);
		frm.setAttribute('method', 'post');
		frm.setAttribute('target', '_blank');
		frm.setAttribute('enctype', 'multipart/form-data');
		frm.innerHTML = '<input name="act" value="zip" />' +
			'<textarea name="files" id="ziptxt"></textarea>';
		frm.style.display = 'none';

		qsr('#widgeti>form');
		ebi('widgeti').appendChild(frm);
		var obj = ebi('ziptxt');
		obj.value = txt;
		console.log(txt);
		frm.submit();
	};
	ebi('seldl').onclick = function (e) {
		ev(e);
		var sel = r.getsel();
		for (var a = 0; a < sel.length; a++)
			dl_file(sel[a].vp + sel[a].q);
	};
	r.render = function () {
		var tds = QSA('#files tbody td+td+td'),
			is_srch = !!ebi('unsearch');

		if (!is_srch)
			for (var a = 0, aa = tds.length; a < aa; a++)
				tds[a].onclick = r.seltgl;

		r.selui(true);
		arcfmt.render();
		fileman.render();
		ebi('selzip').style.display = is_srch ? 'none' : '';
	}
	return r;
})();


(function () {
	if (!FormData)
		return;

	var form = QS('#op_new_md>form'),
		tb = QS('#op_new_md input[name="name"]');

	form.onsubmit = function (e) {
		if (tb.value) {
			if (toast.tag == L.mk_noname)
				toast.hide();

			return true;
		}

		ev(e);
		toast.err(10, L.mk_noname, L.mk_noname);
		return false;
	};
})();


(function () {
	if (!FormData)
		return;

	var form = QS('#op_mkdir>form'),
		tb = QS('#op_mkdir input[name="name"]'),
		sf = mknod('div');

	clmod(sf, 'msg', 1);
	form.parentNode.appendChild(sf);

	form.onsubmit = function (e) {
		ev(e);
		var dn = tb.value;
		if (!dn) {
			toast.err(10, L.mk_noname, L.mk_noname);
			return false;
		}

		if (toast.tag == L.mk_noname || toast.tag == L.fd_xe1)
			toast.hide();

		clmod(sf, 'vis', 1);
		sf.textContent = 'creating "' + dn + '"...';

		var fd = new FormData();
		fd.append("act", "mkdir");
		fd.append("name", dn);

		var xhr = new XHR();
		xhr.vp = get_evpath();
		xhr.dn = dn;
		xhr.open('POST', dn.startsWith('/') ? (SR || '/') : xhr.vp, true);
		xhr.onload = xhr.onerror = cb;
		xhr.responseType = 'text';
		xhr.send(fd);

		return false;
	};

	function cb() {
		if (this.vp !== get_evpath()) {
			sf.textContent = 'aborted due to location change';
			return;
		}

		xhrchk(this, L.fd_xe1, L.fd_xe2);

		if (this.status !== 201) {
			sf.textContent = 'error: ' + hunpre(this.responseText);
			return;
		}

		tb.value = '';
		clmod(sf, 'vis');
		sf.textContent = '';

		var dn = this.getResponseHeader('X-New-Dir');
		dn = dn ? '/' + dn + '/' : uricom_enc(this.dn);
		treectl.goto(dn, true);
		tree_scrollto();
	}
})();


(function () {
	var form = QS('#op_msg>form'),
		tb = QS('#op_msg input[name="msg"]'),
		sf = mknod('div');

	clmod(sf, 'msg', 1);
	form.parentNode.appendChild(sf);

	form.onsubmit = function (e) {
		ev(e);
		clmod(sf, 'vis', 1);
		sf.textContent = 'sending...';

		var xhr = new XHR(),
			ct = 'application/x-www-form-urlencoded;charset=UTF-8';

		xhr.msg = tb.value;
		xhr.open('POST', get_evpath(), true);
		xhr.responseType = 'text';
		xhr.onload = xhr.onerror = cb;
		xhr.setRequestHeader('Content-Type', ct);
		if (xhr.overrideMimeType)
			xhr.overrideMimeType('Content-Type', ct);

		xhr.send('msg=' + uricom_enc(xhr.msg));
		return false;
	};

	function cb() {
		xhrchk(this, L.fsm_xe1, L.fsm_xe2);

		if (this.status < 200 || this.status > 201) {
			sf.textContent = 'error: ' + hunpre(this.responseText);
			return;
		}

		tb.value = '';
		clmod(sf, 'vis');
		sf.textContent = 'sent: "' + this.msg + '"';
		setTimeout(function () {
			treectl.goto();
		}, 100);
	}
})();


var globalcss = (function () {
	var ret = '';
	return function () {
		if (ret)
			return ret;

		var dcs = document.styleSheets;
		for (var a = 0; a < dcs.length; a++) {
			var ds, base = '';
			try {
				base = dcs[a].href;
				if (!base)
					continue;

				ds = dcs[a].cssRules;
				base = base.replace(/[^/]+$/, '');
				for (var b = 0; b < ds.length; b++) {
					var css = ds[b].cssText.split(/\burl\(/g);
					ret += css[0];
					for (var c = 1; c < css.length; c++) {
						var m = /(^ *["']?)(.*)/.exec(css[c]),
							delim = m[1],
							ctxt = m[2],
							is_abs = /^\/|[^)/:]+:\/\//.exec(ctxt);

						ret += 'url(' + delim + (is_abs ? '' : base) + ctxt;
					}
					ret += '\n';
				}
				if (ret.indexOf('\n@import') + 1) {
					var c0 = ret.split('\n'),
						c1 = [],
						c2 = [];

					for (var a = 0; a < c0.length; a++)
						(c0[a].startsWith('@import') ? c1 : c2).push(c0[a]);

					ret = c1.concat(c2).join('\n');
				}
			}
			catch (ex) {
				console.log('could not read css', a, base);
			}
		}
		return ret;
	};
})();

var sandboxjs = (function () {
	var ret = '',
		busy = false,
		url = SR + '/.cpr/util.js?_=' + TS,
		tag = '<script src="' + url + '"></script>';

	return function () {
		if (ret || busy)
			return ret || tag;

		var xhr = new XHR();
		xhr.open('GET', url, true);
		xhr.onload = function () {
			if (this.status == 200)
				ret = '<script>' + this.responseText + '</script>';
		};
		xhr.send();
		busy = true;
		return tag;
	};
})();


function show_md(md, name, div, url, depth) {
	var errmsg = L.md_eshow + name + ':\n\n',
		now = get_evpath();

	url = url || now;
	if (url != now)
		return;

	wfp_debounce.hide();
	if (!marked) {
		if (depth) {
			clmod(div, 'raw', 1);
			div.textContent = "--[ " + name + " ]---------\r\n" + md;
			return toast.warn(10, errmsg + (WebAssembly ? 'failed to load marked.js' : 'your browser is too old'));
		}

		wfp_debounce.n--;
		return import_js(SR + '/.cpr/deps/marked.js', function () {
			show_md(md, name, div, url, 1);
		});
	}

	md_plug = {}
	md = load_md_plug(md, 'pre');
	md = load_md_plug(md, 'post', sb_md);

	var marked_opts = {
		headerPrefix: 'md-',
		breaks: true,
		gfm: true
	};
	var ext = md_plug.pre;
	if (ext)
		Object.assign(marked_opts, ext[0]);

	try {
		clmod(div, 'mdo', 1);

		var md_html = marked.parse(md, marked_opts);
		if (!have_emp)
			md_html = DOMPurify.sanitize(md_html);

		if (sandbox(div, sb_md, 'mdo', md_html))
			return;

		ext = md_plug.post;
		ext = ext ? [ext[0].render, ext[0].render2] : [];
		for (var a = 0; a < ext.length; a++)
			if (ext[a])
				try {
					ext[a](div);
				}
				catch (ex) {
					console.log(ex);
				}

		var els = QSA('#epi a');
		for (var a = 0, aa = els.length; a < aa; a++) {
			var href = els[a].getAttribute('href');
			if (!href.startsWith('#') || href.startsWith('#md-'))
				continue;

			els[a].setAttribute('href', '#md-' + href.slice(1));
		}
		md_th_set();
		set_tabindex();
		var hash = location.hash;
		if (hash.startsWith('#md-'))
			setTimeout(function () {
				try {
					QS(hash).scrollIntoView();
				}
				catch (ex) { }
			}, 1);
	}
	catch (ex) {
		toast.warn(10, errmsg + ex);
	}
	wfp_debounce.show();
}


function set_tabindex() {
	var els = QSA('pre');
	for (var a = 0, aa = els.length; a < aa; a++)
		els[a].setAttribute('tabindex', '0');
}


function show_readme(md) {
	if (!treectl.ireadme)
		return sandbox(ebi('epi'), '', '', 'a');

	show_md(md, 'README.md', ebi('epi'));
}
if (readme)
	show_readme(readme);


function sandbox(tgt, rules, cls, html) {
	if (!treectl.ireadme) {
		tgt.innerHTML = html ? L.md_off : '';
		return;
	}
	if (!rules || (html || '').indexOf('<') == -1) {
		tgt.innerHTML = html;
		clmod(tgt, 'sb');
		return false;
	}
	clmod(tgt, 'sb', 1);

	var tid = tgt.getAttribute('id'),
		hash = location.hash,
		want = '';

	if (!cls)
		wfp_debounce.hide();

	if (hash.startsWith('#md-'))
		want = hash.slice(1);

	var env = '', tags = QSA('script');
	for (var a = 0; a < tags.length; a++) {
		var js = tags[a].innerHTML;
		if (js && js.indexOf('have_up2k_idx') + 1)
			env = js.split(/\blogues *=/)[0] + 'a;';
	}

	html = '<html class="iframe ' + document.documentElement.className +
		'"><head><style>html{background:#eee;color:#000}</style><style>' + globalcss() +
		'</style><base target="_parent"></head><body id="b" class="logue ' + cls + '">' + html +
		'<script>' + env + '</script>' + sandboxjs() +
		'<script>var d=document.documentElement,TS="' + TS + '",' +
		'loc=new URL("' + location.href.split('?')[0] + '");' +
		'function say(m){window.parent.postMessage(m,"*")};' +
		'setTimeout(function(){var its=0,pih=-1,f=function(){' +
		'var ih=2+Math.min(parseInt(getComputedStyle(d).height),d.scrollHeight);' +
		'if(ih!=pih&&!isNaN(ih)){pih=ih;say("iheight #' + tid + ' "+ih,"*")}' +
		'if(++its<20)return setTimeout(f,20);if(its==20)setInterval(f,200)' +
		'};f();' +
		'window.onfocus=function(){say("igot #' + tid + '")};' +
		'window.onblur=function(){say("ilost #' + tid + '")};' +
		'window.treectl={"goto":function(a){say("goto #' + tid + ' "+(a||""))}};' +
		'var el="' + want + '"&&ebi("' + want + '");' +
		'if(el)say("iscroll #' + tid + ' "+el.offsetTop);' +
		'md_th_set();' +
		(cls == 'mdo' && md_plug.post ?
			'const x={' + md_plug.post + '};' +
			'if(x.render)x.render(ebi("b"));' +
			'if(x.render2)x.render2(ebi("b"));' : '') +
		'},1)</script></body></html>';

	var fr = mknod('iframe');
	fr.setAttribute('title', 'folder ' + tid + 'logue');
	fr.setAttribute('sandbox', rules ? 'allow-' + rules.replace(/ /g, ' allow-') : '');
	fr.setAttribute('srcdoc', html);
	tgt.appendChild(fr);
	treectl.sb_msg = true;
	return true;
}
window.addEventListener("message", function (e) {
	if (!treectl.sb_msg)
		return;

	try {
		console.log('msg:' + e.data);
		var t = e.data.split(/ /g);
		if (t[0] == 'iheight') {
			var el = QSA(t[1] + '>iframe');
			el = el[el.length - 1];
			if (wfp_debounce.n)
				while (el.previousSibling)
					el.parentNode.removeChild(el.previousSibling);

			el.style.height = (parseInt(t[2]) + SBH) + 'px';
			el.style.visibility = 'unset';
			wfp_debounce.show();
		}
		else if (t[0] == 'iscroll') {
			var y1 = QS(t[1]).offsetTop,
				y2 = parseInt(t[2]);
			console.log(y1, y2);
			document.documentElement.scrollTop = y1 + y2;
		}
		else if (t[0] == 'igot' || t[0] == 'ilost') {
			clmod(QS(t[1] + '>iframe'), 'focus', t[0] == 'igot');
		}
		else if (t[0] == 'imshow') {
			thegrid.imshow(e.data.slice(7));
		}
		else if (t[0] == 'goto') {
			var t = e.data.replace(/^[^ ]+ [^ ]+ /, '').split(/[?&]/)[0];
			treectl.goto(t, !!t);
		}
	} catch (ex) {
		console.log('msg-err: ' + ex);
	}
}, false);


if (sb_lg && logues.length) {
	if (logues[1] === Ls.eng.f_empty)
		logues[1] = L.f_empty;

	sandbox(ebi('pro'), sb_lg, '', logues[0]);
	sandbox(ebi('epi'), sb_lg, '', logues[1]);
}


(function () {
	try {
		var tr = ebi('files').tBodies[0].rows;
		for (var a = 0; a < tr.length; a++) {
			var td = tr[a].cells[1],
				ao = td.firstChild,
				href = noq_href(ao),
				isdir = href.endsWith('/'),
				txt = ao.textContent;

			td.setAttribute('sortv', (isdir ? '\t' : '') + txt);
		}
	}
	catch (ex) { }
})();


function ev_row_tgl(e) {
	ev(e);
	filecols.toggle(this.parentElement.parentElement.getElementsByTagName('span')[0].textContent);
}


var unpost = (function () {
	ebi('op_unpost').innerHTML = (
		L.un_m1 + ' &ndash; <a id="unpost_refresh" href="#">' + L.un_upd + '</a>' +
		'<p>' + L.un_m4 + ' <a id="unpost_ulist" href="#">' + L.un_ulist + '</a> / <a id="unpost_ucopy" href="#">' + L.un_ucopy + '</a>' +
		'<p>' + L.un_flt + ' <input type="text" id="unpost_filt" size="20" placeholder="documents/passwords" /><a id="unpost_nofilt" href="#">' + L.un_fclr + '</a></p>' +
		'<div id="unpost"></div>'
	);

	var r = {},
		ct = ebi('unpost'),
		filt = ebi('unpost_filt');

	r.files = [];
	r.me = null;

	r.load = function () {
		var me = Date.now(),
			html = [];

		function unpost_load_cb() {
			if (!xhrchk(this, L.fu_xe1, L.fu_xe2))
				return ebi('op_unpost').innerHTML = L.fu_xe1;

			try {
				var ores = JSON.parse(this.responseText);
			}
			catch (ex) {
				return ebi('op_unpost').innerHTML = '<p>' + L.badreply + ':</p>' + unpre(this.responseText);
			}

			if (ores.u.length == 1 && ores.u[0].timeout) {
				html.push('<p>' + L.un_nou + '</p>');
				ores.u = [];
			}

			if (ores.c.length == 1 && ores.c[0].kinshi) {
				html.push('<p>' + L.un_noc + '</p>');
				ores.c = [];
			}

			for (var a = 0; a < ores.u.length; a++)
				ores.u[a].k = 'u';

			for (var a = 0; a < ores.c.length; a++)
				ores.c[a].k = 'c';

			var res = ores.u.concat(ores.c);

			if (res.length) {
				if (res.length == 2000)
					html.push("<p>" + L.un_max);
				else
					html.push("<p>" + L.un_avail.format(ores.c.length, ores.u.length));

				html.push("<br />" + L.un_m2 + "</p>");
				html.push("<table><thead><tr><td></td><td>time</td><td>size</td><td>done</td><td>file</td></tr></thead><tbody>");
			}
			else
				html.push('-- <em>' + (filt.value ? L.un_no2 : L.un_no1) + '</em>');

			var mods = [10, 100, 1000];
			for (var a = 0; a < res.length; a++) {
				for (var b = 0; b < mods.length; b++)
					if (a % mods[b] == 0 && res.length > a + mods[b] / 10)
						html.push(
							'<tr><td></td><td colspan="3" style="padding:.5em">' +
							'<a me="' + me + '" class="n' + a + '" n2="' + (a + mods[b]) +
							'" href="#">' + L.un_next.format(Math.min(mods[b], res.length - a)) + '</a></td></tr>');

				var done = res[a].k == 'c';
				html.push(
					'<tr><td><a me="' + me + '" class="n' + a + '" href="#">' + (done ? L.un_del : L.un_abrt) + '</a></td>' +
					'<td>' + unix2iso(res[a].at) + '</td>' +
					'<td>' + ('' + res[a].sz).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</td>' +
					(done ? '<td>100%</td>' : '<td>' + res[a].pd + '%</td>') +
					'<td>' + linksplit(res[a].vp).join('<span> / </span>') + '</td></tr>');
			}

			html.push("</tbody></table>");
			ct.innerHTML = html.join('\n');
			r.files = res;
			r.me = me;
		}

		var q = SR + '/?ups';
		if (filt.value)
			q += '&filter=' + uricom_enc(filt.value, true);

		var xhr = new XHR();
		xhr.open('GET', q, true);
		xhr.onload = xhr.onerror = unpost_load_cb;
		xhr.send();

		ct.innerHTML = "<p><em>" + L.un_m3 + "</em></p>";
	};

	function linklist() {
		var ret = [],
			base = location.origin.replace(/\/$/, '');

		for (var a = 0; a < r.files.length; a++)
			ret.push(base + r.files[a].vp);

		return ret.join('\r\n');
	}

	function unpost_delete_cb() {
		if (this.status !== 200) {
			var msg = unpre(this.responseText);
			toast.err(9, L.un_derr + msg);
			return;
		}

		for (var a = this.n; a < this.n2; a++) {
			var o = QSA('#op_unpost a.n' + a);
			for (var b = 0; b < o.length; b++) {
				var o2 = o[b].closest('tr');
				o2.parentNode.removeChild(o2);
			}
		}
		toast.ok(5, this.responseText);

		if (!QS('#op_unpost a[me]'))
			ebi(goto_unpost());
	}

	ct.onclick = function (e) {
		var tgt = e.target.closest('a[me]');
		if (!tgt)
			return;

		if (!tgt.getAttribute('href'))
			return;

		ev(e);
		var ame = tgt.getAttribute('me');
		if (ame != r.me)
			return toast.err(0, L.un_f5);

		var n = parseInt(tgt.className.slice(1)),
			n2 = parseInt(tgt.getAttribute('n2') || n + 1),
			req = [];

		for (var a = n; a < n2; a++) {
			var links = QSA('#op_unpost a.n' + a);
			if (!links.length)
				continue;

			var f = r.files[a];
			if (f.k == 'u') {
				var vp = vsplit(f.vp.split('?')[0]),
					dfn = uricom_dec(vp[1]);
				for (var iu = 0; iu < up2k.st.files.length; iu++) {
					var uf = up2k.st.files[iu];
					if (uf.name == dfn && uf.purl == vp[0])
						return modal.alert(L.un_uf5);
				}
			}
			req.push(uricom_dec(f.vp.split('?')[0]));
			for (var b = 0; b < links.length; b++) {
				links[b].removeAttribute('href');
				links[b].innerHTML = '[busy]';
			}
		}

		toast.show('inf r', 0, L.un_busy.format(req.length));

		var xhr = new XHR();
		xhr.n = n;
		xhr.n2 = n2;
		xhr.open('POST', SR + '/?delete&unpost&lim=' + req.length, true);
		xhr.onload = xhr.onerror = unpost_delete_cb;
		xhr.send(JSON.stringify(req));
	};

	var tfilt = null;
	filt.oninput = function () {
		clearTimeout(tfilt);
		tfilt = setTimeout(r.load, 250);
	};

	ebi('unpost_nofilt').onclick = function (e) {
		ev(e);
		filt.value = '';
		r.load();
	};

	ebi('unpost_refresh').onclick = function (e) {
		ev(e);
		goto('unpost');
	};

	ebi('unpost_ulist').onclick = function (e) {
		ev(e);
		modal.alert(linklist());
	};

	ebi('unpost_ucopy').onclick = function (e) {
		ev(e);
		var txt = linklist();
		cliptxt(txt + '\n', function () {
			toast.inf(5, L.un_clip.format(txt.split('\n').length));
		});
	};

	return r;
})();


function goto_unpost(e) {
	unpost.load();
}


function wintitle(txt, noname) {
	if (txt === undefined)
		txt = '';

	if (s_name && !noname)
		txt = s_name + ' ' + txt;

	txt += get_vpath().slice(1, -1).split('/').pop();

	document.title = txt;
}


ebi('path').onclick = function (e) {
	if (ctrl(e))
		return true;

	var a = e.target.closest('a[href]');
	if (!a || !(a = a.getAttribute('href') + '') || !a.endsWith('/'))
		return;

	thegrid.setvis(true);
	treectl.reqls(a, true);
	return ev(e);
};


var scroll_y = -1;
var scroll_vp = '\n';
var scroll_obj = null;
function persist_scroll() {
	var obj = scroll_obj;
	if (!obj) {
		var o1 = document.getElementsByTagName('html')[0];
		var o2 = document.body;
		obj = o1.scrollTop > o2.scrollTop ? o1 : o2;
	}
	var y = obj.scrollTop;
	if (y > 0)
		scroll_obj = obj;

	scroll_y = y;
	scroll_vp = get_evpath();
}
function restore_scroll() {
	if (get_evpath() == scroll_vp && scroll_obj && scroll_obj.scrollTop < 1)
		scroll_obj.scrollTop = scroll_y;
}


ebi('files').onclick = ebi('docul').onclick = function (e) {
	if (!treectl.csel && e && (ctrl(e) || e.shiftKey))
		return true;

	if (!showfile.active())
		persist_scroll();

	var tgt = e.target.closest('a[id]');
	if (tgt && tgt.getAttribute('id').indexOf('f-') === 0 && tgt.textContent.endsWith('/')) {
		var el = treectl.find(tgt.textContent.slice(0, -1));
		if (el) {
			el.click();
			return ev(e);
		}
		treectl.reqls(tgt.getAttribute('href'), true);
		return ev(e);
	}
	if (tgt && /\.PARTIAL(\?|$)/.exec('' + tgt.getAttribute('href')) && !window.partdlok) {
		ev(e);
		modal.confirm(L.f_partial, function () {
			window.partdlok = 1;
			tgt.click();
		}, null);
	}

	tgt = e.target.closest('a[hl]');
	if (tgt) {
		var a = ebi(tgt.getAttribute('hl')),
			href = a.getAttribute('href'),
			fun = function () {
				showfile.show(href, tgt.getAttribute('lang'));
			},
			szs = ft2dict(a.closest('tr'))[0].sz,
			sz = parseInt(szs.replace(/[, ]/g, ''));

		if (sz < 1024 * 1024)
			fun();
		else
			modal.confirm(L.f_bigtxt.format(f2f(sz / 1024 / 1024, 1)), fun, null);

		return ev(e);
	}

	tgt = e.target.closest('a');
	if (tgt && tgt.closest('li.bn')) {
		thegrid.setvis(true);
		treectl.goto(tgt.getAttribute('href'), true);
		return ev(e);
	}
};


function reload_mp() {
	if (mp && mp.au) {
		mpo.au = mp.au;
		mpo.au2 = mp.au2;
		mpo.acs = mp.acs;
		mpo.fau = mp.fau;
		mpl.unbuffer();
	}
	var plays = QSA('tr>td:first-child>a.play');
	for (var a = plays.length - 1; a >= 0; a--)
		plays[a].parentNode.innerHTML = '-';

	mp = new MPlayer();
	if (mp.au && mp.au.tid && mp.au.evp == get_evpath()) {
		var el = QS('a#a' + mp.au.tid);
		if (el)
			clmod(el, 'act', 1);

		el = el && el.closest('tr');
		if (el)
			clmod(el, 'play', 1);
	}

	setTimeout(pbar.onresize, 1);
}


function reload_browser() {
	filecols.set_style();

	var parts = get_evpath().split('/'),
		rm = ebi('entree'),
		ftab = ebi('files'),
		link = '', o;

	while (rm.nextSibling)
		rm.parentNode.removeChild(rm.nextSibling);

	for (var a = 0; a < parts.length - 1; a++) {
		link += parts[a] + '/';
		var link2 = dks[link] ? addq(link, 'k=' + dks[link]) : link;

		o = mknod('a');
		o.setAttribute('href', link2);
		o.textContent = uricom_dec(parts[a]) || '/';
		ebi('path').appendChild(mknod('i'));
		ebi('path').appendChild(o);
	}

	var oo = QSA('#files>tbody>tr>td:nth-child(3)');
	for (var a = 0, aa = oo.length; a < aa; a++) {
		var sz = oo[a].textContent.replace(/ +/g, ""),
			hsz = sz.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

		oo[a].textContent = hsz;
	}

	reload_mp();
	try { showsort(ftab); } catch (ex) { }
	makeSortable(ftab, function () {
		msel.origin_id(null);
		msel.load(true);
		thegrid.setdirty();
		mp.read_order();
	});

	var ns = ['pro', 'epi', 'lazy']
	for (var a = 0; a < ns.length; a++)
		clmod(ebi(ns[a]), 'hidden', ebi('unsearch'));

	if (up2k)
		up2k.set_fsearch();

	thegrid.setdirty();
	msel.render();
}
treectl.hydrate();
