▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0909-2343  `v1.15.1`  session

<img src="https://github.com/9001/copyparty/raw/hovudstraum/docs/logo.svg" width="250" align="right"/>

blessed by ⑨, this release is [certified strong](https://github.com/user-attachments/assets/05459032-736c-4b9a-9ade-a0044461194a) ([artist](https://x.com/hcnone))

## new features

* login sessions b5405174
  * a random session cookie is generated for each known user, replacing the previous plaintext login cookie
  * the logout button will nuke the session on all clients where that user is logged in
  * the sessions are stored in the database at `--ses-db`, default `~/.config/copyparty/sessions.db` (docker uses `/cfg/sessions.db` similar to the other runtime configs)
    * if you run multiple copyparty instances, much like [shares](https://github.com/9001/copyparty#shares) and [user-changeable passwords](https://github.com/9001/copyparty#user-changeable-passwords) you'll want to keep a separate db for each instance
  * can be mostly disabled with `--no-ses` when it turns out to be buggy

## bugfixes

* v1.13.8 broke the u2c `--ow` option to replace/overwrite files on the server during upload 6eee6015



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0908-1925  `v1.15.0`  fill the drives

## recent important news

* [v1.15.0 (2024-09-08)](https://github.com/9001/copyparty/releases/tag/v1.15.0) changed upload deduplication to be default-disabled
* [v1.14.3 (2024-08-30)](https://github.com/9001/copyparty/releases/tag/v1.14.3) fixed a bug that was introduced in v1.13.8 (2024-08-13); this bug could lead to **data loss** -- see the v1.14.3 release-notes for details

# upload deduplication now disabled by default

because many people found the behavior surprising. This also makes it easier to use copyparty together with other software, since there is no risk of damage to symlinks if there are no symlinks to damage

to enable deduplication, use either `--dedup` (old-default, symlink-based), or `--hardlink` (will use hardlinks when possible), or `--hardlink-only` (disallow symlinks). To choose the approach that fits your usecase, see [file deduplication](https://github.com/9001/copyparty#file-deduplication) in the readme

verification of local file consistency was also added; this happens when someone uploads a dupe, to ensure that no other software has modified the local file since last reindex. This unfortunately makes uploading of duplicate files much slower, and can be disabled with `--safe-dedup 1` if you know that only copyparty will be modifying the filesystem

## new features

* dedup improvements:
  * verify consistency of local files before using them as dedup source 6e671c52
    * if a local file has been altered by other software since the last reindexing, then this will now be detected
* u2c (commandline uploader): add mode to print hashes of local files 08848be7
  * if you've lost a file but you know its `wark` (file identifier), you can now use u2c.exe to scan your whole filesystem for it: `u2c - .`
* #96 use local timezone in log messages b599fbae

## bugfixes

* dedup fixes:
  * symlinks could break if moved/renamed inside a volume where deduplication was disabled after some files within had already been deduplicated 4401de04
  * when moving/renaming, only consider symlinks between volumes if `xlink` volflag is set b5ad9369
* database consistency verifier (`-e2vp`):
  * support filenames with newlines, and warn about missing files b0de84cb
* opengraph/`--og`: fix viewing textfiles e5a836cb
* up2k.js: fix confusing message when uploading many copies of the same file f1130db1

## other changes

* disable upload deduplication by default a2e0f986
* up2k.js: increase handshake timeout to several minutes because of the dedup changes c5988a04
* copyparty.exe: update to python 3.12.6



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0902-0108  `v1.14.4`  another

## recent important news

* [v1.14.3 (2024-08-30)](https://github.com/9001/copyparty/releases/tag/v1.14.3) fixed a bug that was introduced in v1.13.8 (2024-08-13); this bug could lead to **data loss** -- see the v1.14.3 release-notes for details

## bugfixes

* a network glitch could cause the uploader UI to panic d9e95262



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0830-2311  `v1.14.3`  important dedup fix

<img src="https://github.com/9001/copyparty/raw/hovudstraum/docs/logo.svg" width="250" align="right"/>

* read-only demo server at https://a.ocv.me/pub/demo/
* [docker image](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) ╱ [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) ╱ [client testbed](https://cd.ocv.me/b/)

there is a [discord server](https://discord.gg/25J8CdTT6G) with an `@everyone` in case of future important updates, such as [vulnerabilities](https://github.com/9001/copyparty/security) (most recently 2023-07-23)

# important bugfix ☢️

this version fixes a file deduplication bug which was introduced in [v1.13.8](https://github.com/9001/copyparty/releases/tag/v1.13.8), released 2024-08-13

its worst-case outcome is **loss of data** in the following scenario:
* someone uploads a file into a folder where that filename is already taken, but the file contents are different, and the server already has a copy of that new file elsewhere under a different name

specific example:
* the server has two existing files, `logo.png` and `logo-v2.png`, in the same volume but not necessarily in the same folder, and those files contain different data
* you have a local copy of `logo-v2.png` on your laptop, but your local filename is `logo.png`
* you upload your local `logo.png` onto the server, into the same folder as the server's `logo.png`
* because the files contain different data, the server accidentally replaces the contents of `logo.png` with your version

if you have been using the database feature (globally with `-e2dsa` or volflag `e2ds`), and you suspect you may have hit this bug, then it is a good idea to make a backup of the up2k databases for all your volumes (the files with names starting with `up2k.db`) before restarting copyparty and before you do anything else, especially if you do not have serverlogs from far back in time -- if you have either the databases and/or the serverlogs, then it is possible to identify replaced files with some manual work

you can check if you hit the bug using one of the following two approaches:
* if your OS has the [gnu find](https://linux.die.net/man/1/find) command, do a search for empty files with `find -type f -size 0`
* using copyparty (any OS), do the following steps:
  * make sure that reindex-on-startup is enabled; either globally with `-e2dsa` or volflag `e2ds`
  * then install this new copyparty version
  * click the search tab `[🔎]` and type the number `0` into the `maximum MiB` textbox

if you find any empty files with a filename that indicates it was autogenerated to avoid a name collision, for example `logo.png-1725040569.239207-kbt0xteO.png`, and the value of the number after `logo.png` is larger than `1723507200` (unixtime for 2024-08-13), then this indicates that `logo.png` may have been replaced by another upload

if you have the serverlogs from when the original upload of `logo.png` was made, then this can be used to identify the original contents of the file that was replaced, and to look for other copies. Please get in touch on the discord for assistance if necessary

----

## new features

* shares: add revival and expiration extension ad2371f8
  * share-owners can revive expired shares for `--shr-rt` minutes (default 1 day)
  * ...and extend expiration time by adding 1 minute or 1 hour to the timer
* [sfx customizer](https://github.com/9001/copyparty/blob/hovudstraum/scripts/make-sfx.sh) improvements 03b13e8a
  * improved translations stripper
  * add more examples

## bugfixes

* the dedup bug 3da62ec2
* tftp: support unmapped root 01233991

## other changes

* copyparty.exe: update to pyinstaller 6.10.0 
* textviewer wordwrapping c4e2b0f9
* add logo 7037e736 ee359742



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0823-2307  `v1.14.2`  bing chilling

## new features

* #94 @ultwcz translated the UI to Chinese (thx!)  92edea1d
* #84 improvements to [shares](https://github.com/9001/copyparty#shares): 8122dded
  * if one or more files are selected for sharing, they are placed into a virtual folder
  * more appropriate password UI for accessing protected shares
  * human-readable timestamps in shares listing
* u2c (commandline uploader): support multiple exclusion patterns f356faa2

## bugfixes

* remove confusing logmessage when downloading a zerobyte file 9f034d9c
* shares: 7ff46966
  * fix crash if the root volume is unmapped
  * log-spam on config reload
  * password coalescing
  * add chrome support

## other changes

* #93 add html IDs to the tabstrip 461f3158



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0819-0014  `v1.14.1`  one step forward

[if i turn back now, then this will always follow... one step forward, forward](https://youtu.be/xe3Wkzc0O3k?t=27)

* read-only demo server at https://a.ocv.me/pub/demo/
* [docker image](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) ╱ [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) ╱ [client testbed](https://cd.ocv.me/b/)

there is a [discord server](https://discord.gg/25J8CdTT6G) with an `@everyone` in case of future important updates, such as [vulnerabilities](https://github.com/9001/copyparty/security) (most recently 2023-07-23)

## new features

* #92 users can change their own passwords 83fb569d 00da7440
  * this feature is default-disabled; see [readme](https://github.com/9001/copyparty#user-changeable-passwords)
* #84 share files/folders by creating a temporary url 7c2beba5
  * inspired by other file servers; click the share-button to create a link like `example.com/share/enkz8g374o8g`
    * primary usecase is to sneak past authentication services (see issue description)
  * the create-share UI has options to accept uploads into the share, and/or set expiration time
  * this feature is default-disabled; see [readme](https://github.com/9001/copyparty#shares)

## bugfixes

* #93 fixes for vproxy / location-based / not-vhost-based reverse-proxying 0b46b1a6
  * using `--rp-loc` to reverse-proxy from a subfolder made some UI stuff break
* listening on unix-sockets: 687df2fa
  * fix `x-forwarded-for` support, and avoid a possible container-specific collision
  * new syntax which allows setting unix-permissions and unix-group
    * `-i unix:770:www:/tmp/party.sock` (see `--help-bind` for more examples)
* using relocation hooks (introduced in previous ver) could cause dedup issues c8f4aeae b0af4b37
* custom fonts using `@import` css statements 5a62cb48
* invert volume scrollwheel 7d8d9438

## other changes

* changed the button colors in theme 2 (pm-monokai) from red to yellow 5153db6b
  * the red buttons look better, but are too confusing because usually red means off



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0813-0008  `v1.13.8`  hook into place

## new features

* #86 intentional side-effects from hooks 6c94a63f
  * use hooks (plugins) to conditionally move uploads into another folder depending on filename, extension, uploader ip/name, file contents, ...
  * hooks can create additional files and tell copyparty to index them immediately, or delete an existing file based on some condition
  * only one example so far though, [reloc-by-ext](https://github.com/9001/copyparty/tree/hovudstraum/bin/hooks#before-upload) which was a feature-request to dodge [sharex#3992](https://github.com/ShareX/ShareX/issues/3992)
* listen on unix-sockets ee9aad82
  * `-i unix:/tmp/party.sock` stops listening on TCP ports entirely, and only listens on that unix-socket
  * can be combined with regular sockets, `-i 127.0.0.1,unix:/tmp/a.sock`
  * kinda buggy for now (need to `--xff-src=any` and doesn't let you set socket-perms yet), will be fixed in next ver
  * makes it 10% faster, but more importantly offers tighter access control behind reverse-proxies
    * inspired by https://www.oligo.security/blog/0-0-0-0-day-exploiting-localhost-apis-from-the-browser
* up2k stitching:
  * more optimal stitch sizes for max throughput across connections c862ec1b
  * improve fat32 compatibility 373194c3
* new option `--js-other` to load custom javascript dbd42bc6
  * `--js-browser` affects the filebrowser page, `--js-other` does all the others
  * endless possibilities, such as [adding a login-banner](https://github.com/9001/copyparty/blob/hovudstraum/contrib/plugins/banner.js) which [looks like this](https://github.com/user-attachments/assets/8ae8e087-b209-449c-b08d-74e040f0284b)
* list detected optional dependencies on startup 3db117d8
  * hopefully reduces the guesswork / jank factor by a tiny bit

## bugfixes

* up2k stitching:
  * put the request headers on a diet so they fit through more reverse-proxies 0da719f4
* fix deadlock on s390x (IBM mainframes) 250c8c56

## other changes

* add flags to disengage [features](https://github.com/9001/copyparty/tree/hovudstraum#feature-chickenbits) and [dependencies](https://github.com/9001/copyparty/tree/hovudstraum#dependency-chickenbits) in case they cause trouble 72361c99
* optimizations
  * 6% faster on average d5c9c8eb
  * docker: reduce ram usage 98ffaadf
  * python2: reduce ram usage ebb19818
* docker: add [portainer howto](https://github.com/9001/copyparty/blob/hovudstraum/docs/examples/docker/portainer.md) e136231c
* update deps ca001c85
  * pyftpdlib 1.5.10
  * copyparty.exe: python 3.12.5



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0729-2028  `v1.13.6`  not that big

## new features

* up2k.js: set clientside timeouts on http connections during upload 85e54980
  * some reverse-proxy setups could cause uploads to hang indefinitely by eating requests; should recover nicely now
* audio-player shows statustext while loading 662541c6
* [bsod theme](https://github.com/9001/copyparty/tree/hovudstraum/contrib/themes) [(live demo)](https://cd.ocv.me/c/) 15ddcf53

## bugfixes

* fix bugs in the [long-distance upload optimizations](https://github.com/9001/copyparty/releases/tag/v1.13.5) in the previous version:
  * up2k.js didn't necessarily use the expected chunksize when stitching 225bd80e
  * u2c (commandline uploader): 8916bce3
    * use the correct chunksize instead of overshooting like crazy
    * could crash on exit if `-z` was enabled (so basically harmless)
    * the "time spent uploading" statustext that was printed on exit could multiply by `-j` and exceed walltime
* misc ux 9bb6e0dc
  * don't accept hotkeys until it's safe to do so
  * improve messages regarding the [firefox crash](https://bugzilla.mozilla.org/show_bug.cgi?id=1790500)
  * keep more console logs in memory (easier to debug)
  * fix wordwrap in messageboxes on firefox a19a0fa9

## other changes

* changed the `xm` / "on message" [hook examples](https://github.com/9001/copyparty/tree/hovudstraum/bin/hooks#on-message) to reject users without write-access 99edba4f
* docker images were rebuilt on 2024-08-02, 23:30 UTC with new optimizations: 98ffaadf
  * 😃 RAM usage decreased by `5-6 MiB` for most flavors; `10 MiB` for dj/iv
  * 😕 image size grew by `4 MiB` (min), `6 MiB` (ac/im/iv), `9 MiB` (dj)
  * 😃 startup time reduced to about half
  * and avoids a deadlock on IBM mainframes
* updated comparison to other software 6b54972e
  * `hfs2` is dead, `hfs3` and `filebrowser` improved



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0722-2323  `v1.13.5`  american sized

## new features

* long-distance uploads are now **twice as fast** on average 132a8350
  * boost tcp windowsize scaling by stitching together smaller chunks into bigger chonks so they fly better across the atlantic
  * i'm not kidding, on the two routes we've tested this on we gained 1.6x / 160% (from US-West to Finland) and **2.6x / 260%** (Norway to US-East)
    * files that are between 4 MiB and 256 MiB see the biggest improvement; 70% faster <= 768 MiB, 40% <= 1.5 GiB, 10% <= 6G
  * if this turns out to be buggy, disable it serverside with `--u2sz 1,1,1` or clientside in the browser-ui: `[⚙️]` -> `up2k switches` -> change `64` to `1`
* u2c.py (CLI uploader): support stitching (☝️) + print a summary with hashing and upload speeds  987bce21
* video files can play as audio 53f1e3c9
  * audio is extracted serverside to avoid wasting bandwidth
  * extraction is lossy (converted to opus or mp3 depending on browser)
  * togglebutton `🎧` in the gridview toolbar to enable/disable
* new hook: [into-the-cache-it-goes.py](https://github.com/9001/copyparty/tree/hovudstraum/bin/hooks#after-upload) d26a944d
  * avoids a cloudflare bug (race condition?) where it will send truncated files to visitors on the very first load if several people simultaneously access a file that hasn't been viewed before

## bugfixes

* inline markdown/logues rendered black-on-black in firefox 54 and some other browsers from 2017 and older eeef8091
* unintuitive folder thumbnail selection if folder contains both `Cover.jpg` and `cover.jpg` f955d2bd
* the gridview toolbar got undocked after viewing a pic/vid dc449bf8

## other changes

* #90 recommend rclone in favor of davfs2 ef0ecf87
* improved some error messages e565ad5f
* added helptext exporters to generate the online [html](https://ocv.me/copyparty/helptext.html) and [txt](https://ocv.me/copyparty/helptext.txt) editions 59533990
* mention that cloudflare is incompatible with uploading files larger than 383.9 GiB 



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0716-0457  `v1.13.4`  descript.ion

## new features

* "medialinks"; instead of the usual hotlink, the basic-uploader (as used by sharex and such) can return a link that opens the file in the media viewer c9281f89
  * enable for all uploads with volflag `medialinks`, or just for one upload by adding `?media` to the post url
* thumbnails are now fully compatible with dirkeys/filekeys 52e06226
* `--th-covers` will respect filename order, selecting the first matching filename as the folder thumbnail 1cdb1702
* new hook: [bittorrent downloader](https://github.com/9001/copyparty/tree/hovudstraum/bin/hooks#on-message) bd3b3863 803e1565
* hooks: d749683d
  * can be restricted to only run when user has specific permissions
  * user permissions are also included in the json message to the hook
  * new syntax to prepend args to the hook's command
  * (all this will be better documented after some additional upcoming hook-related features, see `--help-hooks` for now)
* support `descript.ion` usenet metadata; will parse and render into directory listings when possible 927c3bce
  * directory listings are now 2% slower, eh who's keeping count anyways
* tftp-server: 45259251
  * improved support for buggy clients
  * improved ipv6 support, especially on macos
  * improved robustness on unreliable networks
* #85 new option `--gsel` to default-enable the client setting to select files by ctrl-clicking them in the grid 9a87ee2f
* music player: set audio volume by scrollwheel 36d6d29a

## bugfixes

* race-the-beam (downloading an unfinished upload) could get interrupted near the end, requiring a manual resume in the browser's download manager to finish f37187a0
* ftp-server: when accessing the root folder of servers without a root folder, it could mention inaccessible folders 84e8e1dd
* ftp-server: uploads will automatically replace existing files if user has delete perms 0a9f4c60
  * windows 2000 expects this behavior, otherwise it'll freak out and delete stuff and then not actually upload it, nice
  * new option `--ftp-no-ow` restores old default behavior of rejecting upload if target filename exists
* music player:
  * stop trying to recover from a corrupted file if the user already fixed it manually 55a011b9
  * support downloading the currently playing song regardless of current folder c06aa683
* music player preloader: db6059e1
  * stop searching after 5 folders of nothing
  * don't crash playback by walking into error-pages
* `--og` (rich discord embeds) was incompatible with viewing markdown docs d75a2c77
* `--cgen` (configfile generator) much less jank d5de3f2f

## other changes

* mention that HTTP/2 is still usually slower than HTTP/1.1 dfe7f1d9
* give up much sooner if a client is supposed to send a request body but isn't c549f367
* support running copyparty as a server on windows 2000 and winXP 8c73e0cb 2fd12a83
* updated deps 6e58514b
  * copyparty.exe: python 3.12, pillow 10.4, pyinstaller 6.9
  * dompurify 3.1.6



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0601-2324  `v1.13.3`  700+

## new features

* keep tags when transcoding music to opus/mp3 07ea629c
  * useful for batch-downloading folders with [on-the-fly transcoding](https://github.com/9001/copyparty#zip-downloads)
  * excessively large tags will be individually dropped (traktor beatmaps, cover-art, xmp)

## bugfixes

* optimization for large amounts (700+) of tcp connections / clients 07b2bf11
  * `select()` was used for non-https downloads and mdns/ssdp initialization, which would start spinning at more than 1024 FDs, so now they `poll()` when possible (so not on windows)
  * default max number of connections on windows was lowered to 486 since windows maxes out at 512 FDs
* the markdown editor autoindent would duplicate `<hr>` 692175f5

## other changes

* #83: more intuitive behavior for `--df` and the `df` volflag 5ad65450
* print helpful warning if OS restrictions make it impossible to persist config b629d18d
* censor filesystem paths in the download-as-zip error summary 5919607a
* `u2c.exe`: explain that https is disabled bef96176
* ux: 60c96f99
  * hide lightbox buttons when a video is playing
  * move audio seekbar text down a bit so it hides less of the waveform and minute-markers
* updated dompurify to 3.1.5 f00b9394
* updated docker images to alpine 3.20



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0510-1431  `v1.13.2`  s3xmodit.zip

## new features

* play [compressed](https://a.ocv.me/pub/demo/music/chiptunes/compressed/#af-99f0c0e4) s3xmodit chiptunes/modules c0466279
  * can now read gz/xz/zip-compressed s3m/xm/mod/it songs
  * new filetypes supported: mdz, mdgz, mdxz, s3z, s3gz, s3xz, xmz, xmgz, xmxz, itz, itgz, itxz
  * and if you need to fit even more tracks on the mixtape, [try mo3](https://a.ocv.me/pub/demo/music/chiptunes/compressed/#af-0bc9b877)
* option to batch-convert audio waveforms 38e4fdfe
* volflag to improve audio waveform compression with pngquant 82ce6862
* option to add or change mappings from file-extensions to mimetypes 560d7b66
* export and publish the `--help` text for online viewing 560d7b66
  * now available [as html](https://ocv.me/copyparty/helptext.html) and as [plaintext](https://ocv.me/copyparty/helptext.txt), includes many features not documented in the readme
* another way to add your own UI translations 19d156ff

## bugfixes

* ensure OS signals are immediately received and processed 87c60a1e
  * things like reload and shutdown signals from systemd could get lost/stuck
* fix mimetype detection for uppercase file extensions 565daee9
* when clicking a `.ts` file in the gridview, don't open it as text 925c7f0a
  * ...as it's probably an mpeg transport-stream, not a typescript file
* be less aggressive in dropping volume caches e396c5c2
  * very minor performance gain, only really relevant if you're doing something like burning a copyparty volume onto a CD
  * previously, adding or removing any volume at all was enough to drop covers cache for all volumes; now this only happens if an intersecting volume is added/removed

## other changes

* updated dompurify to 3.1.2 566cbb65
* opengraph: add the full filename as url suffix 5c1e2390
  * so discord picks a good filename when saving an image

----

# 💾 what to download?
| download link | is it good? | description |
| -- | -- | -- |
| **[copyparty-sfx.py](https://github.com/9001/copyparty/releases/latest/download/copyparty-sfx.py)** | ✅ the best 👍 | runs anywhere! only needs python |
| [a docker image](https://github.com/9001/copyparty/blob/hovudstraum/scripts/docker/README.md) | it's ok | good if you prefer docker 🐋 |
| [copyparty.exe](https://github.com/9001/copyparty/releases/latest/download/copyparty.exe) |  ⚠️ [acceptable](https://github.com/9001/copyparty#copypartyexe) | for [win8](https://user-images.githubusercontent.com/241032/221445946-1e328e56-8c5b-44a9-8b9f-dee84d942535.png) or later; built-in thumbnailer |
| [u2c.exe](https://github.com/9001/copyparty/releases/download/v1.13.0/u2c.exe) | ⚠️ acceptable | [CLI uploader](https://github.com/9001/copyparty/blob/hovudstraum/bin/u2c.py) as a win7+ exe ([video](https://a.ocv.me/pub/demo/pics-vids/u2cli.webm)) |
| [copyparty.pyz](https://github.com/9001/copyparty/releases/latest/download/copyparty.pyz) | ⚠️ acceptable | similar to the regular sfx, [mostly worse](https://github.com/9001/copyparty#zipapp) |
| [copyparty32.exe](https://github.com/9001/copyparty/releases/latest/download/copyparty32.exe) | ⛔️ [dangerous](https://github.com/9001/copyparty#copypartyexe) | for [win7](https://user-images.githubusercontent.com/241032/221445944-ae85d1f4-d351-4837-b130-82cab57d6cca.png) -- never expose to the internet! |
| [cpp-winpe64.exe](https://github.com/9001/copyparty/releases/download/v1.10.1/copyparty-winpe64.exe) | ⛔️ dangerous | runs on [64bit WinPE](https://user-images.githubusercontent.com/241032/205454984-e6b550df-3c49-486d-9267-1614078dd0dd.png), otherwise useless |

* except for [u2c.exe](https://github.com/9001/copyparty/releases/download/v1.13.0/u2c.exe), all of the options above are mostly equivalent
* the zip and tar.gz files below are just source code
* python packages are available at [PyPI](https://pypi.org/project/copyparty/#files)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0506-0029  `v1.13.1`  ctrl-v

## new features

* upload files by `ctrl-c` from OS and `ctrl-v` into browser c5f7cfc3
  * from just about any file manager (windows explorer, thunar on linux, etc.) into the copyparty web-ui
  * only files, not folders, so drag-drop is still the recommended way
* empty folders show an "empty folder" banner fdda567f
* opengraph / discord embeds ea270ab9 36f2c446 48a6789d b15a4ef7
  * embeds  [audio with covers](https://cd.ocv.me/c/d2/d22/snowy.mp3) , [images](https://cd.ocv.me/c/d2/d22/cover.jpg) , [videos](https://cd.ocv.me/c/d2/d21/no-effect.webm) , [audio without coverart](https://cd.ocv.me/c/d2/bitconnect.mp3) (links to one of the copyparty demoservers where the feature is enabled; link those in discord to test)
  * images are currently not rendering correctly once clicked on android-discord (works on ios and in browser)
  * default-disabled because opengraph disables hotlinking by design
    * enable with `--og` and [see readme](https://github.com/9001/copyparty#opengraph) and [the --help](https://github.com/9001/copyparty/assets/241032/2dabf21e-2470-4e20-8ef0-3821b24be1b6)
* add option to support base64-encoded url queries parceled into the url location 69517e46
  * because android-specific discord bugs prevent the use of queries in opengraph tags
* improve server performance when downloading unfinished uploads, especially on slow storage 70a3cf36
* add dynamic content into `<head>` using `--html-head` which now takes files and/or jinja templates as input b6cf2d30
* `--au-vol` (default 50, same as before) sets default audio volume in percent da091aec
* add **[copyparty.pyz](https://github.com/9001/copyparty/releases/latest/download/copyparty-sfx.py)** buildscript 27485a4c
* support ie4 and the [version of winzip](https://a.ocv.me/pub/g/nerd-stuff/cpp/win311zip.png) you'd find on an average windows 3.11 pc 603d0ed7

## bugfixes

* when logging in from the 403 page, remember and apply the original url hash f8491970
* the config-reset button in the control-panel didn't clear the dotfiles preference bc2c1e42
* the search feature could discover and use stale indexes in volumes where indexing was since disabled 95d9e693
* when in doubt, periodically recheck if filesystems support sparse files f6e693f0
  * reduces opportunities for confusion on servers with removable media (usb flashdrives)

----

this release introduces **[copyparty.pyz](https://github.com/9001/copyparty/releases/latest/download/copyparty.pyz)**, yet another way to bring copyparty where it's needed -- very limited and with many drawbacks (see [readme](https://github.com/9001/copyparty#zipapp)) but may work when the others don't



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0420-2232  `v1.13.0`  race the beam

## new features

* files can be downloaded before the upload has completed ("almost like peer-to-peer")
  * watch the [release trailer](http://a.ocv.me/pub/g/nerd-stuff/cpp/2024-0418-race-the-beam.webm) 👌
  * if the downloader catches up with the upload, the speed is gradually slowed down so it never runs ahead
  * can be disabled with `--no-pipe`
* option `--no-db-ip` disables storing the uploader IP in the database bf585078
* u2c (cli uploader): option `--ow` to overwrite existing files on the server 439cb7f8

## bugfixes

* when running on windows, using the web-UI to abort an upload could fail 8c552f1a
* rapidly PUT-uploading and then deleting files could crash the file hasher feecb3e0



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0412-2110  `v1.12.2`  ie11 fix

## new features

* new option `--bauth-last` for when you're hosting other [basic-auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) services on the same domain 7b94e4ed
  * makes it possible to log into copyparty as intended, but it still sees the passwords from the other service until you do
  * alternatively, the other new option `--no-bauth` entirely disables basic-auth support, but that also kills [the android app](https://github.com/9001/party-up)

## bugfixes

* internet explorer isn't working?! FIX IT!!! 9e5253ef
* audio transcoding was buggy with filekeys enabled b8733653
* on windows, theoretical chance that antivirus could interrupt renaming files, so preemptively guard against that c8e3ed3a

## other changes

* add a "password" placeholder on the login page since you might think it's asking for a username da26ec36
* config buttons were jank on iOS b772a4f8
* readme: [making your homeserver accessible from the internet](https://github.com/9001/copyparty#at-home)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0409-2334  `v1.12.1`  scrolling stuff

## new features

* while viewing pictures/videos, the scrollwheel can be used to view the prev/next file 844d16b9

## bugfixes

* #81 (scrolling suddenly getting disabled) properly fixed after @icxes found another way to reproduce it (thx) 4f0cad54
* and fixed at least one javascript glitch introduced in v1.12.0 while adding dirkeys 989cc613
  * directory tree sidebar could fail to render when popping browser history into the lightbox

## other changes

* music preloader is slightly less hyper f89de6b3
* u2c.exe: updated TLS-certs and deps ab18893c



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0406-2011  `v1.12.0`  locksmith

## new features

* #64 dirkeys; option to auto-generate passwords for folders, so you can give someone a link to a specific folder inside a volume without sharing the rest of the volume 10bc2d92 32c912bb ef52e2c0 0ae12868
  * enabled by volflag `dk` (exact folder only) and/or volflag `dks` (also subfolders); see [readme](https://github.com/9001/copyparty#dirkeys)
* audio transcoding to mp3 if browser doesn't support opus a080759a
  * recursively transcode and download a folder using `?tar&mp3`
  * accidentally adds support for playing just about any audio format in ie11
* audio equalizer also applies to videos 7744226b

## bugfixes

* #81 scrolling could break after viewing an image in the lightbox 9c42cbec
* on phones, audio playback could stop if network is slow/unreliable 59f815ff b88cc7b5 59a53ba9
  * fixes the issue on android, but ios/safari appears to be [impossible](https://github.com/9001/copyparty/blob/hovudstraum/docs/devnotes.md#music-playback-halting-on-phones) d94b5b3f

## other changes

* updated dompurify to 3.0.11
* copyparty.exe: updated to python 3.11.9
* support for building with pyoxidizer was removed 5ab54763



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0323-1724  `v1.11.2`  public idp volumes

* read-only demo server at https://a.ocv.me/pub/demo/
* [docker image](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) ╱ [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) ╱ [client testbed](https://cd.ocv.me/b/)

there is a [discord server](https://discord.gg/25J8CdTT6G) with an `@everyone` in case of future important updates, such as [vulnerabilities](https://github.com/9001/copyparty/security) (most recently 2023-07-23)

## new features

* global-option `--iobuf` to set a custom I/O buffersize 2b24c50e
  * changes the default buffersize to 256 KiB everywhere (was a mix of 64 and 512)
  * may improve performance of networked volumes (s3 etc.) if increased
  * on gbit networks: download-as-tar is now up to 20% faster
  * slightly faster FTP and TFTP too

* global-option `--s-rd-sz` to set a custom read-size for sockets c6acd3a9
  * changes the default from 32 to 256 KiB
  * may improve performance of networked volumes (s3 etc.) if increased
  * on 10gbit networks: uploading large files is now up to 17% faster

* add url parameter `?replace` to overwrite any existing files with a multipart-post c6acd3a9

## bugfixes

* #79 idp volumes (introduced in [v1.11.0](https://github.com/9001/copyparty/releases/tag/v1.11.0)) would only accept permissions for the user that owned the volume; was impossible to grant read/write-access to other users d30ae845

## other changes

* mention the [lack of persistence for idp volumes](https://github.com/9001/copyparty/blob/hovudstraum/docs/idp.md#important-notes) in the IdP docs 2f20d29e



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0318-1709  `v1.11.1`  dont ban the pipes

the [previous release](https://github.com/9001/copyparty/releases/tag/v1.11.0) had all the fun new features... this one's just bugfixes

* read-only demo server at https://a.ocv.me/pub/demo/
* [docker image](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) ╱ [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) ╱ [client testbed](https://cd.ocv.me/b/)

### no vulnerabilities since 2023-07-23
* there is a [discord server](https://discord.gg/25J8CdTT6G) with an `@everyone` in case of future important updates
* [v1.8.7](https://github.com/9001/copyparty/releases/tag/v1.8.7) (2023-07-23) - [CVE-2023-38501](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-38501) - reflected XSS
* [v1.8.2](https://github.com/9001/copyparty/releases/tag/v1.8.2) (2023-07-14) - [CVE-2023-37474](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-37474) - path traversal (first CVE)

## bugfixes

* less aggressive rejection of requests from banned IPs 51d31588
  * clients would get kicked before the header was parsed (which contains the xff header), meaning the server could become inaccessible to everyone if the reverse-proxy itself were to "somehow" get banned
    * ...which can happen if a server behind cloudflare also accepts non-cloudflare connections, meaning the client IP would not be resolved, and it'll ban the LAN IP instead heh
      * that part still happens, but now it won't affect legit clients through the intended route
  * the old behavior can be restored with `--early-ban` to save some cycles, and/or avoid slowloris somewhat
* the unpost feature could appear to be disabled on servers where no volume was mapped to `/` 0287c7ba
* python 3.12 support for [compiling the dependencies](https://github.com/9001/copyparty/tree/hovudstraum/bin/mtag#dependencies) necessary to detect bpm/key in audio files 32553e45

## other changes

* mention [real-ip configuration](https://github.com/9001/copyparty?tab=readme-ov-file#real-ip) in the readme ee80cdb9



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0315-2047  `v1.11.0`  You Can (Not) Proceed

this release was made possible by [stoltzekleiven, kvikklunsj, and tako](https://a.ocv.me/pub/g/nerd-stuff/2024-0310-stoltzekleiven.jpg)

## new features

* #62 support for [identity providers](https://github.com/9001/copyparty#identity-providers) and automatically creating volumes for each user/group ("home folders")
  * login with passkeys / fido2 / webauthn / yubikey / ldap / active directory / oauth / many other single-sign-on contraptions
  * [documentation](https://github.com/9001/copyparty/blob/hovudstraum/docs/idp.md) and [examples](https://github.com/9001/copyparty/tree/hovudstraum/docs/examples/docker/idp-authelia-traefik) could still use some help (I did my best)
* #77 UI to cancel unfinished uploads (available in the 🧯 unpost tab) 3f05b665
  * the user's IP and username must match the upload by default; can be changed with global-option / volflag `u2abort`
* new volflag `sparse` to pretend sparse files are supported even if the filesystem doesn't 8785d2f9
  * gives drastically better performance when writing to s3 buckets through juicefs/geesefs
  * only for when you know the filesystem can deal with it (so juicefs/geesefs is OK, but **definitely not** fat32)
* `--xff-src` and `--ipa` now support CIDR notation (but the old syntax still works) b377791b
* ux:
  * #74 option to use [custom fonts](https://github.com/9001/copyparty/tree/hovudstraum/docs/rice) 263adec7 6cc7101d 8016e671
  * option to disable autoplay when page url contains a song hash 8413ed6d
    * good if you're using copyparty to listen to music at the office and the office policy is to have the webbrowser automatically restart to install updates, meaning your coworkers are suddenly and involuntarily enjoying some loud af jcore while you're asleep at home

## bugfixes

* don't panic if cloudflare (or another reverse-proxy) decides to hijack json responses and replace them with html 7741870d
* #73 the fancy markdown editor was incompatible with caddy (a reverse-proxy) ac96fd9c
* media player could get confused if neighboring folders had songs with the same filenames 206af8f1
* benign race condition in the config reloader (could only be triggered by admins and/or SIGUSR1) 096de508
* running tftp with optimizations enabled would cause issues for `--ipa` b377791b
* cosmetic tftp bugs 115020ba
* ux:
  * up2k rendering glitch if the last couple uploads were dupes 547a4863
  * up2k rendering glitch when switching between readonly/writeonly folders 51a83b04
  * markdown editor preview was glitchy on tiny screens e5582605

## other changes

* add a [sharex v12.1](https://github.com/9001/copyparty/tree/hovudstraum/contrib#sharexsxcu) config example 2527e903
* make it easier to discover/diagnose issues with docker and/or reverse-proxy config d744f3ff
* stop recommending the use of `--xff-src=any` in the log messages 7f08f10c
* ux:
  * remove the `k304` togglebutton in the controlpanel by default 1c011ff0
  * mention that a full restart is required for `[global]` config changes to take effect 0c039219
* docs e78af022
  * [how to use copyparty with amazon aws s3](https://github.com/9001/copyparty#using-the-cloud-as-storage)
  * faq: http/https confusion caused by incorrectly configured cloudflare
  * #76 docker: ftp-server howto
* copyparty.exe: updated pyinstaller to 6.5.0 bdbcbbb0



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0221-2132  `v1.10.2`  tall thumbs

## new features

* thumbnails can be way taller when centercrop is disabled in the browser UI 5026b212
  * good for folders with lots of portrait pics (no more letterboxing)
* more thumbnail stuff:
  * zoom levels are twice as granular 5026b212
  * write-only folders get an "upload-only" icon 89c6c2e0
  * inaccessible files/folders get a 403/404 icon 8a38101e

## bugfixes

* tftp fixes d07859e8
  * server could crash if a nic disappeared / got restarted mid-transfer
  * tiny resource leak if dualstack causes ipv4 bind to fail
* thumbnails:
  * when behind a caching proxy (cloudflare), icons in folders would be a random mix of png and svg 43ee6b9f
  * produce valid folder icons when thumbnails are disabled 14af136f
* trailing newline in html responses d39a99c9

## other changes

* webdeps: update dompurify 13e77777
* copyparty.exe: update jinja2, markupsafe, pyinstaller, upx 13e77777



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0218-1554  `v1.10.1`  big thumbs

## new features

* button to enable hi-res thumbnails 33f41f3e 58ae38c6
  * enable with the `3x` button in the gridview
  * can be force-enabled/disabled serverside with `--th-x3` or volflag `th3x`
* tftp: IPv6 support and UTF-8 filenames + optimizations 0504b010
* ux:
  * when closing the image viewer, scroll to the last viewed pic bbc37990
  * respect `prefers-reduced-motion` some more places fbfdd833

## bugfixes

* #72 impossible to delete recently uploaded zerobyte files if database was disabled 6bd087dd
* tftp now works in `copyparty.exe`, `copyparty32.exe`, `copyparty-winpe64.exe`
* the [sharex config example](https://github.com/9001/copyparty/tree/hovudstraum/contrib#sharexsxcu) was still using cookie-auth 8ff7094e
* ux:
  * prevent scrolling while a pic is open 7f1c9926
  * fix gridview in older firefox versions 7f1c9926

## other changes

* thumbnail center-cropping can be force-enabled/disabled serverside with `--th-crop` or volflag `crop`
  * replaces `--th-no-crop` which is now deprecated (but will continue to work)

----

this release contains a build of `copyparty-winpe64.exe` which is almost **entirely useless,** except for in *extremely specific scenarios*, namely the kind where a TFTP server could also be useful -- the [previous build](https://github.com/9001/copyparty/releases/download/v1.8.7/copyparty-winpe64.exe) was from [version 1.8.7](https://github.com/9001/copyparty/releases/tag/v1.8.7) (2023-07-23)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0215-0000  `v1.10.0`  tftp

## new features

* TFTP server d636316a 8796c09f acbb8267 02879713
  * based on [partftpy](https://github.com/9001/partftpy), has most essential features EXCEPT for [rfc7440](https://datatracker.ietf.org/doc/html/rfc7440) so WAN will be slow
  * is already doing real work out in the wild! see the fantastic quote in the [readme](https://github.com/9001/copyparty?tab=readme-ov-file#tftp-server)
* detect some (un)common configuration mistakes
  * buggy reverse-proxy which strips away all URL parameters 136c0fdc
    * could cause the browser to get stuck in a refresh-loop
  * a volume on an sqlite-incompatible filesystem (a remote cifs server or such) and an up2k volume inside d4da3861
    * sqlite could deadlock or randomly throw exceptions; serverlog will now explain how to fix it
* ie11: file selection with shift-up/down 64ad5853

## bugfixes

* prevent music playback from stopping at the end of a folder f262aee8
  * preloader will now proactively hunt for the next file to play as the last song is ending
* in very specific scenarios, clients could be told their upload had finished processing a tiny bit too early, while the HDD was still busy taking in the last couple bytes 6f8a588c
  * so if you expected to find the complete file on the server HDD immediately as the final chunk got confirmed, that was not necessarily the case if your server HDD was severely overloaded to the point where closing a file takes half a minute
    * huge thx to friend with said overloaded server for finding all the crazy edge cases
* ignore harmless javascript errors from easymde 879e83e2

## other changes

* the "copy currently playing song info to clipboard" button now excludes the uploader IP ed524d84
* mention that enabling `-j0` can improve HDD load during uploads 5d92f4df
* mention a debian-specific docker bug which prevents starting most containers (not just copyparty) 4e797a71



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0203-1533  `v1.9.31`  eject

## new features

* disable mkdir / new-doc buttons until a name is provided d3db6d29
* warning about browsers limiting the number of connections c354a38b

## bugfixes

* #71 stop videos from buffering in the background a17c267d
* improve up2k ETA on slow networks / many connections c1180d6f
* u2c: exclude-filter didn't apply to file deletions b2e23340
* `--touch` / `re📅` didn't apply to zerobyte files 945170e2

## other changes

* notes on [hardlink/symlink conversion](https://github.com/9001/copyparty/blob/6c2c6090/docs/notes.sh#L35-L46) 6c2c6090
* [lore](https://github.com/9001/copyparty/blob/hovudstraum/docs/notes.md#trivia--lore) b1cf5884



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0125-2252  `v1.9.30`  retime

probably last release before v1.10 (IdP), please watch warmly

## new features

* option to replace serverside last-modified timestamps to match uploader's local files 55eb6921
  * requires uploader to have write+delete permissions because it tampers with existing files
  * in the browser-UI, enable with the `re📅` button in the settings tab `⚙️`
  * u2c (commandline uploader): `--touch`
* media player can shuffle songs now 01c82b54
  * click `🔀` in the media-player settings tab `🎺` to enable
* windows: retry deleting busy files 3313503e aa3a9719
  * to support webdav-clients that upload and then immediately delete files (clonezilla)
* options in batch-rename UI to ensure filenames are windows-safe b4e0a341
* more support for older browsers 4ef31060
  * ie9: gridview, navpane, text-viewer, text-editor
  * ie9, firefox10: make sure toasts are properly closed

## bugfixes

* older chromes (and current iPhones) could randomly panic in incognito mode b32d6520
* errormessage filepath sanitizer didn't catch histpaths in non-default locations 0f386c4b
* now possible to mount the entire filesystem as a volume (please don't) 14bccbe4
* on 32bit machines, disable sendfile when necessary to avoid python bug b9d0c853
* `-q` would still print filesystem-indexing progress to STDOUT 6dbfcddc



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2024-0114-0629  `v1.9.29`  RAM friendly

## new features

* try to keep track of RAM usage in the thumbnailer 95a59996
  * very inaccurate, just wild guessing really, but probably good enough:
  * an attempt to stop FFmpeg from eating all the RAM when generating spectrograms
  * `--th-ram-max` specifies how much RAM it's allowed to use (default 6 GB), crank it up if thumbnailing is too slow now
* much faster startup on devices with slow filesystems and lots of files in the volume root (especially android phones) f1358dba
* `uncache` button (in mediaplayer settings) a55e0d6e
  * rotates all audio URLs, in case the browser has a cached copy of a broken mp3 or whatnot
* now possible to POST files without having to set the `act: bput` multipart field 9bc09ce9
  * mainly to support [igloo irc](https://github.com/9001/copyparty#client-examples) and other simplistic upload clients
* try to point the linux oom-killer at FFmpeg so it doesn't kill innocent processes instead dc8e621d
  * only works if copyparty has acces to /proc, so not in prisonparty, and maybe not in docker (todo)
* UX:
  * do another search immediately if a search-filter gets unchecked a4239a46
  * several ie11 fixes (keyboard hotkeys and a working text editor) 2fd2c6b9

## bugfixes

* POSTing files could block for a really long time if the database is busy (filesystem reindexing), now it schedules the indexing for later instead e8a653ca
* less confusing behavior when reindexing a file (keep uploader-ip/time if file contents turn out to be unmodified, and drop both otherwise) 226c7c30

## other changes

* better log messages when clients decide to disconnect in the middle of a POST 02430359
* add a warning if copyparty is started with an account definition (`-a`) which isn't used in any volumes e01ba855
* when running on macos, don't index apple metadata files (`.DS_Store` and such) d0eb014c
  * they are still downloadable by anyone with read-access, and still appear in directory listings for users with access to see dotfiles
* added a [log repacker](https://github.com/9001/copyparty/blob/hovudstraum/scripts/logpack.sh) to shrink/optimize old logs dee0950f
* and a [contextlet](https://github.com/9001/copyparty/blob/hovudstraum/contrib/README.md#send-to-cppcontextletjson) example



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1231-1849  `v1.9.28`  eo2023

was hoping to finish the IdP stuff during 37c3 but that fell through, so here's all the other recent fixes instead -- happy newyears

## new features

* #66 new permission `.` to grant access to see dotfiles (hidden files) to specific users
  * and new volflag `dots` to grant access to all users with `r`ead
  * `-ed` still behaves like before (anyone with `r` can see dotfiles in all volumes)
* #70 new permission `A` (alias of `rwmda.`) grants read/write/move/delete/admin/dotfiles
* #67 folder thumbnails can be dotfiles (`.cover.jpg`, `.folder.png`) if the database is enabled (`-e2dsa`)
* new option `--u2j` to specify default number of parallel file uploads in the up2k browser client
  * default (2) is good on average; 16 can be good when most uploaders are overseas
* curl gets plaintext 404/403 messages

## bugfixes

* cors-checking is disabled if the `PW` header is provided, just like the [readme](https://github.com/9001/copyparty#cors) always claimed
* server would return `200 OK` while trying to return a file that is unreadable due to filesystem permissions
* `--xdev` still doesn't work on windows, but at least now it doesn't entirely break filesystem indexing
* fix tiny resource leak due to funky dualstack on macos

## other changes

* logfiles are padded to align messages when `-q` is specified, similar to current/previous behavior without `-q`
* `--hdr-au-usr` was renamed to `--idp-h-usr` in preparation for other `--idp` things
  * any mentions of `--hdr-au-usr` are translated to the new name on startup



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1208-2133  `v1.9.27`  another dedup bug

so [v1.9.26](https://github.com/9001/copyparty/releases/tag/v1.9.26) fixed how moving a symlink could break other related symlinks, and then it turns out symlinks themselves could also die when moving them to another location, and somehow nobody encountered any of these until now... surely there are no more deduplication-related issues left at this point, yeah?

## bugfixes

* #65 moving deduplicated copies of files (symlinks) from one location to another could make them disappear (break the symlinks)

  * don't worry, we are **not** talking about data loss! but see the [release notes for v1.9.26](https://github.com/9001/copyparty/releases/tag/v1.9.26) which explain how to deal with this issue (how to find, diagnose, and repair broken symlinks)

----

## regarding fedora packages

[copr-pypi](https://copr.fedorainfracloud.org/coprs/g/copr/PyPI/) (fedora's build service) is not building at the moment; ***if you installed copyparty from copr-pypi,*** you can upgrade to this release by running one of the following:

```bash
dnf install https://ocv.me/copyparty/fedora/37/python3-copyparty.fc37.noarch.rpm
dnf install https://ocv.me/copyparty/fedora/38/python3-copyparty.fc38.noarch.rpm
dnf install https://ocv.me/copyparty/fedora/39/python3-copyparty.fc39.noarch.rpm
```



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1208-0136  `v1.9.26`  dont break symlinks

## new features
* *tumbleweed*

## bugfixes

* deleting files from the server could make some duplicates of that file unavailable (by breaking nested symlinks)

  * don't worry, we are **not** talking about data loss! but such broken links would disappear from the directory listing and would need to be remedied by replacing the broken links manually, either by using a file explorer or commandline

  * **only** affected linux/macos, did **not** affect servers with `--hardlink` or `--never-symlink` or `--no-dedup`, and **mainly** affected servers with lots of duplicate files (with some dupes in the same folder and some elsewhere)

  * if you want to check for such broken symlinks, the following unix command will find all of them: `find -L -type l`

  * to repair a broken link, first remove it and then replace it: `rm thelink.opus; ln -s /mnt/music/realfile.opus thelink.opus`

  * if you are left with a mystery file and want to know where its duplicates are, you can grep for the filename in the logs and you'll find something like the following line, where the `wark` is the file identifier; grep for that to find all the other copies of that file -- `purl` is the folder/URL which that copy of the file was uploaded to:
    ```json
    {"name": "04. GHOST.opus", "purl": "/mu/vt/suisei/still-still-stellar/", "size": 4520986, "lmod": 1697091772, "sprs": true, "hash": [], "wark": "SJMASMtWOa0UZnc002nn5unO5iCBMa-krt2CDcq8eJe9"}
    ```

* the server would throw an error if you tried to delete a broken symlink
* prevent warnings about duplicate file entries in the database by preventing that from happening in the first place
* `u2c.py` (commandline uploader) would fail to delete files from the server if there's more than ~10'000 files to be deleted
  * and forgot to bump the version number... `1.11 (2nd season)`

## other changes
* `--help` was slightly improved
* docker images are now based on alpine v3.19
* `copyparty.exe` is now based on python v3.11.7



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1201-2326  `v1.9.25`  focus

## new features
* remember and restore scroll position when leaving the textfile viewer

## bugfixes
* the request-smuggling detetcor was too strict, blocking access to textfiles with newlines / control-codes in the filename
* focus and text selection in messageboxes was still jank, mainly in firefox and especially phones

## other changes
* the banhammer now applies on attempts at request-smuggling and path traversals
  * these were merely detected and rejected before, might as well bonk them
* reject bad requests with a terse 500 instead of abruptly disconnecting in some cases
  * stops firefox from rapidly spamming additional attempts



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1201-0210  `v1.9.24`  header auth

## new features
* initial work on #62 (support identity providers, oauth/SSO/...); see [readme](https://github.com/9001/copyparty#identity-providers)
  * only authentication so far; no authorization yet, and users must exist in the copyparty config with bogus passwords
* new option `--ipa` rejects connections from clients outside of a given allowlist of IP prefixes
* environment variables can be used almost everywhere that takes a filesystem path; should make it way more comfy to write configs for docker / systemd
* #59 added a basic [docker-compose yaml](https://github.com/9001/copyparty/blob/hovudstraum/docs/examples/docker/basic-docker-compose) and an example config
  * probably much room for improvement on everything docker still

## bugfixes
* the nftables-based port-forwarding in the [systemd example](https://github.com/9001/copyparty/tree/hovudstraum/contrib/systemd) was buggy; replaced with CAP_NET_BIND_SERVICE
* palemoon-specific js crash if a text selection was dragged
* text selection in messageboxes was jank

## other changes
* improved [systemd example](https://github.com/9001/copyparty/tree/hovudstraum/contrib/systemd) with hardening and a better example config
* logfiles are flushed for every line written; can be disabled with `--no-logflush` for ~3% more performance best-case
* iphones probably won't broadcast cover-art to car stereos over bluetooth anymore since the thingamajig in iOS that's in charge of that doesn't have cookie-access, and strapping in the auth is too funky so let's stop doing that b7723ac2
  * can be remedied by enabling filekeys and granting unauthenticated people access that way, but that's too much effort for anyone to bother with I'm sure



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1125-1417  `v1.9.21`  in a bind

## new features
* #63 the grid-view will open textfiles in the textfile viewer
* [prisonparty](https://github.com/9001/copyparty/blob/hovudstraum/bin/prisonparty.sh) now accepts user/group names (in addition to IDs)

## bugfixes
* the `Y` hotkey (which turns all links into download links) didn't affect the grid-view
* on some servers with unusual filesystem layouts (especially ubuntu-zfs), [prisonparty](https://github.com/9001/copyparty/blob/hovudstraum/bin/prisonparty.sh) would make an unholy mess of recursive bind-mounts, quickly running out of inodes and requiring a server reboot
  * added several safeguards to avoid anything like this in the future
    * mutex around jail setup/teardown to prevent racing other instances
    * verify jail status by inspecting /proc/mounts between each folder to bind



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1121-2325  `v1.9.20`  nice

## new features
* expensive subprocesses (ffmpeg, parsers, hooks) will run with `nice` to reduce cpu priority
  * ...so listening to flacs won't grind everything else to a halt

## bugfixes
* the "load more" search results button didn't disappear if you hit the serverside limit
* the "show all" button for huge folders didn't disappear when navigating into a smaller folder
* trying to play the previous track when you're already playing the first track in a folder would send you on a wild adventure



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1119-1229  `v1.9.19`  shadow filter

## bugfixes
* #61 Mk.II: filter search results to also handle this issue in volumes where reindexing is disabled, or (spoiler warning:) a bug in the directory indexer prevents shadowed files from being forgotten
* filekeys didn't always get included in the up2k UI for world-readable folders



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1118-2106  `v1.9.18`  cache invalidation

## bugfixes
* #61 search results could contain stale records from overlapping volumes:
  * if volume `/foo` is indexed and then volume `/foo/bar` is later created, any files inside the `bar` subfolder would not become forgotten in `/foo`'s database until something in `/foo` changes, which could be never
  * as a result, search results could show stale metadata from `/foo`'s database regarding files in `/foo/bar`
  * fix this by dropping caches and reindexing if copyparty is started with a different list of volumes than last time
* #60 client error when ctrl-clicking search results
* icons for the close/more buttons in search results are now pillow-10.x compatible

## other changes
* `u2c.exe`: upgraded certifi to version `2023.11.17`



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1111-1738  `v1.9.17`  11-11

## new features
* `u2c.py` / `u2c.exe` (the commandline uploader):
  * `-x` is now case-insensitive
  * if a file fails to upload after 30 attempts, give up (bitflips)
  * add 5 sec delay before reattempts (configurable with `--cd`)

## bugfixes
* clients could crash the file indexer by uploading and then instantly deleting files (as some webdav clients tend to do)
* and fix some upload errorhandling which broke during a refactoring in v1.9.16

## other changes
* upgraded pyftpdlib to v1.5.9



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1104-2158  `v1.9.16`  windedup

## breaking changes
* two of the prometheus metrics have changed slightly; see the [breaking changes readme section](https://github.com/9001/copyparty#breaking-changes)
  * (i'm not familiar with prometheus so i'm not sure if this is a big deal)

## new features
* #58 versioned docker images! no longer just `latest`
* browser: the mkdir feature now accepts `foo/bar/qux` and `../foo` and `/bar`
* add 14 more prometheus metrics; see [readme](https://github.com/9001/copyparty#prometheus) for details
  * connections, requests, malicious requests, volume state, file hashing/analyzation queues
* catch some more malicious requests in the autoban filters
  * some malicious requests are now answered with HTTP 422, so that they count against `--ban-422`

## bugfixes
* windows: fix symlink-based upload deduplication
  * MS decided to make symlinks relative to working-directory rather than destination-path...
* `--stats` would produce invalid metrics if a volume was offline
* minor improvements to password hashing ux:
  * properly warn if `--ah-cli` or `--ah-gen` is used without `--ah-alg`
  * support `^D` during `--ah-cli`
* browser-ux / cosmetics:
  * fix toast/tooltip colors on splashpage
  * easier to do partial text selection inside links (search results, breadcrumbs, uploads)
  * more rclone-related hints on the connect-page

## other changes
* malformed http headers from clients are no longer included in the client error-message
  * just in case there are deployments with a reverse-proxy inserting interesting stuff on the way in
  * the serverlog still contains all the necessary info to debug your own clients
* updated [example nginx config](https://github.com/9001/copyparty/blob/hovudstraum/contrib/nginx/copyparty.conf) to recover faster from brief server outages
  * the default value of `fail_timeout` (10sec) makes nginx cache the outage for longer than necessary



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1024-1643  `v1.9.15`  expand placeholder

[made it just in time!](https://a.ocv.me/pub/g/nerd-stuff/PXL_20231024_170348367.jpg) (EDIT: nevermind, three of the containers didn't finish uploading to ghcr before takeoff ;_; all up now)

## new features
* #56 placeholder variables in markdown documents and prologue/epilogue html files
  * default-disabled; must be enabled globally with `--exp` or per-volume with volflag `exp`
  * `{{self.ip}}` becomes the client IP; see [/srv/expand/README.md](https://github.com/9001/copyparty/blob/hovudstraum/srv/expand/README.md) for more examples
* dynamic-range-compressor: reduced volume jumps between songs when enabled

## bugfixes
* v1.9.14 broke the `scan` volflag, causing volume rescans to happen every 10sec if enabled
  * its global counterpart `--re-maxage` was not affected



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1021-1443  `v1.9.14`  uptime

## new features
* search for files by upload time
* option to display upload time in directory listings
  * enable globally with `-e2d -mte +.up_at` or per-volume with volflags `e2d,mte=+.up_at`
  * has a ~17% performance impact on directory listings
* [dynamic range compressor](https://en.wikipedia.org/wiki/Dynamic_range_compression) in the audioplayer settings
* `--ban-404` is now default-enabled
  * the turbo-uploader will now un-turbo when necessary to avoid banning itself
  * this only affects accounts with permissions `g`, `G`, or `h`
    * accounts with read-access (which are able to see directory listings anyways) and accounts with write-only access are no longer affected by `--ban-404` or `--ban-url`

## bugfixes
* #55 clients could hit the `--url-ban` filter when uploading over webdav
  * fixed by limiting `--ban-404` and `--ban-url` to accounts with permission `g`, `G`, or `h`
* fixed 20% performance drop in python 3.12 due to utcfromtimestamp deprecation
  * but 3.12.0 is still 5% slower than 3.11.6 for some reason
* volume listing on startup would display some redundant info

## other changes
* timeout for unfinished uploads increased from 6 to 24 hours
  * and is now configurable with `--snap-drop`



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1015-2006  `v1.9.12`  more buttons

just adding requested features, nothing important

## new features
* button `📅` in the uploader (default-enabled) sends your local last-modified timestamps to the server
  * when deselected, the files on the server will have the upload time as their timestamps instead
  * `--u2ts` specifies the default setting, `c` client-last-modified or `u` upload-time, or `fc` and `fu` to force
* button `full` in the gridview decides if thumbnails should be center-cropped or not
  * `--no-crop` and the `nocrop` volflag now sets the default value of this instead of forcing the setting
  * thumbnail cleanup is now more granular, cleaning full-jpg separately from cropped-webp for example
* set default sort order with `--sort` or volflag `sort`
  * one or more comma-separated values; `tags/Cirle,tags/.tn,tags/Artist,tags/Title,href`
    * see the column header tooltips in the browser to know what names (`id`) to use
  * prefix a column name with `-` for descending sort
  * specifying a sort order in the client will override all server-defined ones
* when visiting a read-only folder, the upload-or-filesearch toggle will remember its previous state and restore it when leaving the folder
  * much more intuitive, if anything about this UI can be called that...

## bugfixes
* iPhone: rare javascript panic when switching between safari and another app
* ie9: file-rename ui was borked

## other changes
* copyparty.exe: upgrade to pillow 10.1 (which adds a new font for thumbnails in chrome)
  * still based on python 3.11.6 because 3.12 is currently slower than 3.11



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1009-0036  `v1.9.11`  bustin'

okay, i swear this is the last version for weeks! probably

## bugfixes
* cachebuster didn't apply to dynamically loaded javascript files
  * READMEs could fail to render with `ReferenceError: DOMPurify is not defined` after upgrading from a copyparty older than v1.9.2



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1008-2051  `v1.9.10`  badpwd

## new features
* argument `--log-badpwd` specifies how to log invalid login attempts;
  * `0` = just a warning with no further information
  * `1` = log incorrect password in plaintext (default)
  * `2` = log sha512 hash of the incorrect password
  * `1` and `2` are convenient for stuff like setting up autoban triggers for common passwords using fail2ban or similar

## bugfixes
* none!
  * the formerly mentioned caching-directives bug turned out to be unreachable... oh well, better safe than sorry



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1007-2229  `v1.9.9`  fix cross-volume dedup moves

## bugfixes
* v1.6.2 introduced a bug which, when moving files between volumes, could cause the move operation to abort when it encounters a deduplicated file



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-1006-1750  `v1.9.8`  static filekeys

## new features
* #52 add alternative filekey generator:
  * volflag `fka` changes the calculation to ignore filesize and inode-number, only caring about the absolute-path on the filesystem and the `--fk-salt`
  * good for linking to markdown files which might be edited, but reduces security a tiny bit
* add warning on startup if `--fk-salt` is too weak (for example when it was upgraded from before [v1.7.6](https://github.com/9001/copyparty/releases/tag/v1.7.6))
  * removed the filekey upgrade feaure to ensure a weak fk-salt is not selected; a new filekey will be generated from scratch on startup if necessary

## other changes
* pyftpdlib upgraded to 1.5.8
* copyparty.exe built on python 3.11.6
  * the exe in this release will be replaced with an 3.12.0 exe as soon as [pillow adds 3.12 support](https://github.com/python-pillow/Pillow/issues/6941)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0930-2332  `v1.9.7`  better column hider

## new features
* column hiding on phones is much more intuitive
  * since you usually want to hide multiple columns, the hiding mode must now be manually disengaged
  * click-handler now covers the entire header cell, preventing a misclick from accidentally sorting the table instead

## bugfixes
* #51 running copyparty with an invalid value for `--lang` made it crash with a confusing error message
  * also makes it more compatible with other localStorage-using webservices running on the same domain

## other changes
* CVE-2023-5217, a vulnerability in libvpx, was fixed by alpine recently and no longer present in the docker images
  * unlike the fix in v1.9.6, this is irrelevant since it was impossible to reach in all conceivable setups, but still nice



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0923-1215  `v1.9.6`  configurable x-forwarded-for

## new features
* rudimentary support for jython and graalpy, and directory tree sidebar in internet explorer 9 through 11, and firefox 10
  * all older browsers (ie4, ie6, ie8, Netscape) get basic html instead
* #35 adds a [hook](https://github.com/9001/copyparty/blob/hovudstraum/bin/hooks/msg-log.py) which extends the message-to-serverlog feature so it writes the message to a textfile on the server
  * could theoretically be extended into a [full instant-messaging feature](https://github.com/9001/copyparty/blob/hovudstraum/srv/chat.md) but that's silly, [nobody would do that](https://ocv.me/stuff/cchat.webm)
    * [r0c is much better](https://github.com/9001/r0c) than this joke

## bugfixes
* 163e3fce the `x-forwarded-for` header was ignored if the nearest reverse-proxy is not asking from 127.0.0.1, which broke client IPs in containerized deployments
  * the serverlog will now explain how to trust the reverse-proxy to provide client IPs, but basically,
  * `--xff-hdr` specifies which header to read the client's real ip from
  * `--xff-src` is an allowlist of IP-addresses to trust that header from
* a62f744a if copyparty was started while an external HDD was not connected, and that volume's index was stored elsewhere, then the index would get wiped (since all the files are gone)
* 3b8f66c0 javascript could crash while uploading from a very unreliable internet connection

## other changes
* copyparty.exe: updated pillow to 10.0.1 which fixes the webp cve
* alpine, which the docker images are based on, turns out to be fairly slow -- currently working on a new docker image (probably fedora-based) which will be 30% faster at analyzing multimedia files and in general 20% faster on average



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0909-1336  `v1.9.5`  webhotell

[happy 9/9!](https://safebooru.org/index.php?page=post&s=view&id=4027419)

## new features
* new permission `h` disables directory listing (so works like `g`) except it redirects to the folder's index.html instead of 404
  * index.html is accessible by anyone with `h` even if filekeys are enabled
  * well suited for running a shared-webhosting gig (thx kipu) especially now that the...
* markdown editor can now be used on non-markdown files if account has `w`rite and `d`elete
  * hotkey `e` to edit a textfile while it's open in the textfile viewer
* SMB: account permissions now work fully as intended, thanks to impacket 0.11
  * but enabling `--smb` is still strongly discouraged as it's a massive security hazard
* download-as-zip can be 2.5x faster on tiny files, at least 15% faster in general
* download folders as pax-format tarfiles with `?tar=pax` or `?tar=pax,xz:9`

## bugfixes
* 422-autoban accidentally triggered when uploading lots of duplicate files (thx hiem!)
* `--css-browser` and `--js-browser` now accepts URLs with cache directives
  * `--css-browser=/the.css?cache=600` (seconds) or `--js-browser=/.res/the.js?cache=i` (7 days)
* SMB: avoid windows freaking out and disconnecting if it hits an offline volume
* hotkey shift-r to rotate pictures counter-clockwise didn't do anything
* hacker theme wasn't hacker enough (everything is monospace now)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0902-0018  `v1.9.4`  yes symlink times

hello! it's been a while, an entire day even...

## new features
* download folder as tar.gz, tar.bz2, tar.xz
  * single-threaded, so extremely slow, but nice for easily compressed data or challenged networks
  * append `?tar=gz`, `?tar=bz2` or `?tar=xz` to a folder URL to do it
  * default compression levels are gz:3, bz2:2, xz:1; override with `?tar=gz:9`

# bugfixes
* c1efd227 symlink-deduplicated files got indexed with the wrong last-modified timestamp
  * mostly inconsequential; would cause the dupe's uploader-ip to be forgotten on the next server restart since it would reindex to "fix" the timestamp
* when linking [a search query](https://a.ocv.me/pub/#q=tags%20like%20soundsho*) it loads the results faster

# other changes
* update readme to mention that iPhones and iPads dislike the preload feature and respond by glitching the audio a bit when a song is exactly 20 seconds away from ending and yet how it's probably a bad idea to disable preloading since i bet it's load-bearing against other iOS bugs
  * speaking of iPhones and iPads, the [previous version](https://github.com/9001/copyparty/releases/tag/v1.9.3) should have fixed album playback on those



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0831-2211  `v1.9.3`  iOS and http fixes

## new features
* iPhones and iPads are now able to...
  * 9986136d play entire albums while the screen is off without the music randomly stopping
    * apple keeps breaking AudioContext in new and interesting ways; time to give up (no more equalizer)
  * 1c0d9789 perform search queries and execude js code
    * by translating [smart-quotes](https://stackoverflow.com/questions/48678359/ios-11-safari-html-disable-smart-punctuation) into regular `'` and `"` characters
* python 3.12 support
  * technically a bugfix since it was added [a year ago](https://github.com/9001/copyparty/commit/32e22dfe) way before the first py3.12 alpha was released but turns out i botched it, oh well
* filter error messages so they never include the filesystem path where copyparty's python files reside
* print more context in server logs if someone hits an unexpected permission-denied

# bugfixes
found some iffy stuff combing over the code but, as far as I can tell, luckily none of these were dangerous:
* URL normalization was a bit funky, but it appears everything access-control-related was unaffected
* some url parameters were double-decoded, causing the unpost filtering and file renaming to fail if the values contained `%`
* clients could cause the server to return an invalid cache-control header, but newlines and control-characters got rejected correctly
* minor cosmetics / qol fixes:
  * reduced flickering on page load in chrome
  * fixed some console spam in search results
  * markdown documents now have the same line-height in directory listings and the editor



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0826-2116  `v1.9.2`  bigger hammer

## new features
* more ways to automatically ban users! three new sensors, all default-enabled, giving a 1 day ban after 9 hits in 2 minutes:
  * `--ban-403`: trying to access volumes that dont exist or require authentication
  * `--ban-422`: invalid POST messages (from brutefocing POST parameters and such)
  * `--ban-url`: URLs which 404 and also match `--sus-urls` (scanners/crawlers)
  * if you want to run a vulnerability scan on copyparty, please just [download the server](https://github.com/9001/copyparty/releases/latest/download/copyparty-sfx.py) and do it locally! takes less than 30 seconds to set up, you get lower latency, and you won't be filling up the logfiles on the demo server with junk, thank you 🙏
* more ban-related stuff,
  * new global option `--nonsus-urls` specifies regex of URLs which are OK to 404 and shouldn't ban people
  * `--turbo` now accepts the value `-1` which makes it impossible for clients to enable it, making `--ban-404` safe to use
* range-selecting files in the list-view by shift-pgup/pgdn
* volumes which are currently unavailable (dead nfs share, external HDD which is off, ...) are marked with a ❌ in the directory tree sidebar
* the toggle-button to see dotfiles is now persisted as a cookie so it also applies on the initial page load
* more effort is made to prevent `<script>`s inside markdown documents from running in the markdown editor and the fullpage viewer
  * anyone who wanted to use markdown files for malicious stuff can still just upload an html file instead, so this doesn't make anything more secure, just less confusing
  * the safest approach is still the `nohtml` volflag which disables markdown rendering outside sandboxes entirely, or only giving out write-access to trustworthy people
  * enabling markdown plugins with `-emp` now has the side-effect of cancelling this band-aid too

## bugfixes
* textfile navigation hotkeys broke in the previous version

## other changes
* example [nginx config](https://github.com/9001/copyparty/blob/hovudstraum/contrib/nginx/copyparty.conf) was not compatible with cloudflare (suggest `$http_cf_connecting_ip` instead of `$proxy_add_x_forwarded_for`)
* `copyparty.exe` is now built with python 3.11.5 which fixes [CVE-2023-40217](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-40217)
  * `copyparty32.exe` is not, because python understandably ended win7 support 
* [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md):
  * copyparty appears to be 30x faster than nextcloud and seafile at receiving uploads of many small files
  * seafile has a size limit when zip-downloading folders



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0820-2338  `v1.9.1`  prometheable

## new features
* #49 prometheus / grafana / openmetrics integration ([see readme](https://github.com/9001/copyparty#prometheus))
  * read metrics from http://127.0.0.1:3923/.cpr/metrics after enabling with `--stats`
* download a folder with all music transcoded to opus by adding `?tar=opus` or `?zip&opus` to the URL
  * can also be used to download thumbnails instead of full images; `?tar=w` for webp, `?tar=j` for jpg
    * so i guess the long-time requested feature of pre-generating thumbnails kind of happened after all, if you schedule a `curl http://127.0.0.1:3923/?tar=w >/dev/null` after server startup
* u2c (commandline uploader): argument `-x` to exclude files by regex (compares absolute filesystem paths)
* `--zm-spam 30` can be used to improve zeroconf / mDNS reliability on crazy networks
  * only necessary if there are clients with multiple IPs and some of the IPs are outside the subnets that copyparty are in -- not spec-compliant, not really recommended, but shouldn't cause any issues either
  * and `--mc-hop` wasn't actually implemented until now
* dragging an image from another browser window onto the upload button is now possible
  * only works on chrome, and only on windows or linux (not macos)
* server hostname is prefixed in all window titles
  * can be adjusted with `--bname` (the file explorer) and `--doctitle` (all other documents)
  * can be disabled with `--nth` (just window title) or `--nih` (title + header)

## bugfixes
* docker: the autogenerated seeds for filekeys and account passwords now get persisted to the config volume (thx noktuas)
* uploading files with fancy filenames could fail if the copyparty server is running on android
* improve workarounds for some apple/iphone/ios jank (thx noktuas and spiky)
  * some ui elements had their font-size selected by fair dice roll
  * the volume control does nothing because [apple disabled it](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW11), so add a warning
  * the image gallery cannot be fullscreened [as apple intended](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#browser_compatibility) so add a warning

## other changes
* file table columns are now limited to browser window width
* readme: mention that nginx-QUIC is currently very slow (thx noktuas)
* #50 add a safeguard to the wget plugin in case wget at some point adds support for `file://` or similar
* show a suggestion on startup to enable the database



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0725-1550  `v1.8.8`  just boring bugfixes

final release until late august unless something bad happens and i end up building this thing on a shinkansen

## recent security / vulnerability fixes
* there is a [discord server](https://discord.gg/25J8CdTT6G) with an `@everyone` in case of future important updates
* [v1.8.7](https://github.com/9001/copyparty/releases/tag/v1.8.7) (2023-07-23) - [CVE-2023-38501](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-38501) - reflected XSS
* [v1.8.2](https://github.com/9001/copyparty/releases/tag/v1.8.2) (2023-07-14) - [CVE-2023-37474](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-37474) - path traversal (first CVE)
  * all serverlogs reviewed so far (5 public servers) showed no signs of exploitation

## bugfixes
* range-select with shiftclick:
  * don't crash when entering another folder and shift-clicking some more
  * remember selection origin when lazy-loading more stuff into the viewport
* markdown editor:
  * fix confusing warnings when the browser cache decides it *really* wants to cache
  * and when a document starts with a newline
* remember intended actions such as `?edit` on login prompts
* Windows: TLS-cert generation (triggered by network changes) could occasionally fail



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0723-1543  `v1.8.7`  XSS for days

at the lack of better ideas, there is now a [discord server](https://discord.gg/25J8CdTT6G) with an `@everyone` for all future important updates such as this one

## bugfixes
* reflected XSS through `/?k304` and `/?setck`
  * if someone tricked you into clicking a URL containing a chain of `%0d` and `%0a` they could potentially have moved/deleted existing files on the server, or uploaded new files, using your account
  * if you use a reverse proxy, you can check if you have been exploited like so:
    * nginx: grep your logs for URLs containing `%0d%0a%0d%0a`, for example using the following command:
      ```bash
      (gzip -dc access.log*.gz; cat access.log) | sed -r 's/" [0-9]+ .*//' | grep -iE '%0[da]%0[da]%0[da]%0[da]'
      ```
  * if you find any traces of exploitation (or just want to be on the safe side) it's recommended to change the passwords of your copyparty accounts
  * huge thanks *again* to @TheHackyDog !
* the original fix for CVE-2023-37474 broke the download links for u2c.py and partyfuse.py
* fix mediaplayer spinlock if the server only has a single audio file



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0721-0036  `v1.8.6`  fix reflected XSS

## bugfixes
* reflected XSS through `/?hc` (the optional subfolder parameter to the [connect](https://a.ocv.me/?hc) page)
  * if someone tricked you into clicking `http://127.0.0.1:3923/?hc=<script>alert(1)</script>` they could potentially have moved/deleted existing files on the server, or uploaded new files, using your account
  * if you use a reverse proxy, you can check if you have been exploited like so:
    * nginx: grep your logs for URLs containing `?hc=` with `<` somewhere in its value, for example using the following command:
      ```bash
      (gzip -dc access.log*.gz; cat access.log) | sed -r 's/" [0-9]+ .*//' | grep -E '[?&](hc|pw)=.*[<>]'
      ```
  * if you find any traces of exploitation (or just want to be on the safe side) it's recommended to change the passwords of your copyparty accounts
  * thanks again to @TheHackyDog !



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0718-0746  `v1.8.4`  range-select v2

**IMPORTANT:** `v1.8.2` (previous release) fixed [CVE-2023-37474](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-37474) ; please see the [1.8.2 release notes](https://github.com/9001/copyparty/releases/tag/v1.8.2) (all serverlogs reviewed so far showed no signs of exploitation)

* read-only demo server at https://a.ocv.me/pub/demo/
* [docker image](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) ╱ [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) ╱ [client testbed](https://cd.ocv.me/b/)

## new features
* #47 file selection by shift-clicking
  * in list-view: click a table row to select it, then shift-click another to select all files in-between
  * in grid-view: either enable the `multiselect` button (mainly for phones/tablets), or the new `sel` button in the `[⚙️] settings` tab (better for mouse+keyboard), then shift-click two files
* volflag `fat32` avoids a bug in android's sdcardfs causing excessive reindexing on startup if any files were modified on the sdcard since last reboot

## bugfixes
* minor corrections to the new features from #45
  * uploader IPs are now visible for `a`dmin accounts in `d2t` volumes as well

## other changes
* the admin-panel is only accessible for accounts which have the `a` (admin) permission-level in one or more volumes; so instead of giving your user `rwmd` access, you'll want `rwmda` instead:
  ```bash
  python3 copyparty-sfx.py -a joe:hunter2 -v /mnt/nas/pub:pub:rwmda,joe
  ```
  or in a settings file,
  ```yaml
  [/pub]
    /mnt/nas/pub
    accs:
      rwmda: joe
  ```
  * until now, `rw` was enough, however most readwrite users don't need access to those features
  * grabbing a stacktrace with `?stack` is permitted for both `rw` and `a`



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0714-1558  `v1.8.2`  URGENT: fix path traversal vulnerability

* read-only demo server at https://a.ocv.me/pub/demo/
* [docker image](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) ╱ [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) ╱ [client testbed](https://cd.ocv.me/b/)

Starting with the bad and important news; this release fixes https://github.com/9001/copyparty/security/advisories/GHSA-pxfv-7rr3-2qjg / [CVE-2023-37474](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-37474) -- so please upgrade!

Every version until now had a [path traversal vulnerability](https://owasp.org/www-community/attacks/Path_Traversal) which allowed read-access to any file on the server's filesystem. To summarize,
* Every file that the copyparty process had the OS-level permissions to read, could be retrieved over HTTP without password authentication
* However, an attacker would need to know the full (or copyparty-module-relative) path to the file; it was luckily impossible to list directory contents to discover files on the server
* You may have been running copyparty with some mitigations against this:
  * [prisonparty](https://github.com/9001/copyparty/tree/hovudstraum/bin#prisonpartysh) limited the scope of access to files which were intentionally given to copyparty for sharing; meaning all volumes, as well as the following read-only filesystem locations: `/bin`, `/lib`, `/lib32`, `/lib64`, `/sbin`, `/usr`, `/etc/alternatives`
  * the [nix package](https://github.com/9001/copyparty#nix-package) has a similar mitigation implemented using systemd concepts
  * [docker containers](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) would only expose the files which were intentionally mounted into the container, so even better
* More conventional setups, such as just running the sfx (python or exe editions), would unfortunately expose all files readable by the current user
* The following configurations would have made the impact much worse:
  * running copyparty as root

So, three years, and finally a CVE -- which has been there since day one... Not great huh. There is a list of all the copyparty alternatives that I know of in the `similar software` link above.

Thanks for flying copyparty! And especially if you decide to continue doing so :-)

## new features
* #43 volflags to specify thumbnailer behavior per-volume;
  * `--th-no-crop` / volflag `nocrop` to specify whether autocrop should be disabled
  * `--th-size` / volflag `thsize` to set a custom thumbnail resolution
  * `--th-convt` / volflag `convt` to specify conversion timeout
* #45 resulted in a handful of opportunities to tighten security in intentionally-dangerous setups (public folders with anonymous uploads enabled):
  * a new permission, `a` (in addition to the existing `rwmdgG`), to show the uploader-IP and upload-time for each file in the file listing
    * accidentally incompatible with the `d2t` volflag (will be fixed in the next ver)
  * volflag `nohtml` is a good defense against (un)intentional XSS; it returns HTML-files and markdown-files as plaintext instead of rendering them, meaning any malicious `<script>` won't run -- bad idea for regular use since it breaks fundamental functionality, but good when you really need it
    * the README-previews below the file-listing still renders as usual, as this is fine thanks to the sandbox
  * a new eventhook `--xban` to run a plugin when copyparty decides to ban someone (for password bruteforcing or excessive 404's), for example to blackhole the IP using fail2ban or similar

## bugfixes
* **fixes a path traversal vulnerability,** https://github.com/9001/copyparty/security/advisories/GHSA-pxfv-7rr3-2qjg / [CVE-2023-37474](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-37474)
  * HUGE thanks to @TheHackyDog for reporting this !!
  * if you use a reverse proxy, you can check if you have been exploited like so:
    * nginx: grep your logs for URLs containing both `.cpr/` and `%2[^0]`, for example using the following command:
      ```bash
      (gzip -dc access.log.*.gz; cat access.log) | sed -r 's/" [0-9]+ .*//' | grep -E 'cpr/.*%2[^0]' | grep -vF data:image/svg
      ```
* 77f1e514 fixes an extremely unlikely race-condition (see the commit for details)
* 8f59afb1 fixes another race-condition which is a bit worse:
  * the unpost feature could collide with other database activity, with the worst-case outcome being aborted batch operations, for example a directory move or a batch-rename which stops halfways

----

# 💾 what to download?
| download link | is it good? | description |
| -- | -- | -- |
| **[copyparty-sfx.py](https://github.com/9001/copyparty/releases/latest/download/copyparty-sfx.py)** | ✅ the best 👍 | runs anywhere! only needs python |
| [a docker image](https://github.com/9001/copyparty/blob/hovudstraum/scripts/docker/README.md) | it's ok | good if you prefer docker 🐋 |
| [copyparty.exe](https://github.com/9001/copyparty/releases/latest/download/copyparty.exe) |  ⚠️ [acceptable](https://github.com/9001/copyparty#copypartyexe) | for [win8](https://user-images.githubusercontent.com/241032/221445946-1e328e56-8c5b-44a9-8b9f-dee84d942535.png) or later; built-in thumbnailer |
| [u2c.exe](https://github.com/9001/copyparty/releases/download/v1.7.1/u2c.exe) | ⚠️ acceptable | [CLI uploader](https://github.com/9001/copyparty/blob/hovudstraum/bin/u2c.py) as a win7+ exe ([video](https://a.ocv.me/pub/demo/pics-vids/u2cli.webm)) |
| [copyparty32.exe](https://github.com/9001/copyparty/releases/latest/download/copyparty32.exe) | ⛔️ [dangerous](https://github.com/9001/copyparty#copypartyexe) | for [win7](https://user-images.githubusercontent.com/241032/221445944-ae85d1f4-d351-4837-b130-82cab57d6cca.png) -- never expose to the internet! |
| [cpp-winpe64.exe](https://github.com/9001/copyparty/releases/download/v1.8.2/copyparty-winpe64.exe) | ⛔️ dangerous | runs on [64bit WinPE](https://user-images.githubusercontent.com/241032/205454984-e6b550df-3c49-486d-9267-1614078dd0dd.png), otherwise useless |

* except for [u2c.exe](https://github.com/9001/copyparty/releases/download/v1.7.1/u2c.exe), all of the options above are equivalent
* the zip and tar.gz files below are just source code
* python packages are available at [PyPI](https://pypi.org/project/copyparty/#files)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0707-2220  `v1.8.1`  in case of 404

## new features
* [handlers](https://github.com/9001/copyparty/tree/hovudstraum/bin/handlers); change the behavior of 404 / 403 with plugins
  * makes it possible to use copyparty as a [caching proxy](https://github.com/9001/copyparty/blob/hovudstraum/bin/handlers/caching-proxy.py)
* #42 add mpv + streamlink support to [very-bad-idea](https://github.com/9001/copyparty/tree/hovudstraum/bin/mtag#dangerous-plugins)
* add support for Pillow 10
  * also improved text rendering in icons
* mention the [fedora package](https://github.com/9001/copyparty#fedora-package) in the readme

## bugfixes
* theme 6 (hacker) didn't show the state of some toggle-switches
* windows: keep quickedit enabled when hashing passwords interactively



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0626-0005  `v1.8.0`  argon

News: if you use rclone as a copyparty webdav client, upgrading to [rclone v1.63](https://github.com/rclone/rclone/releases/tag/v1.63.0) (just released) will give you [a huge speed boost](https://github.com/rclone/rclone/pull/6897) for small files

## new features
* #39 hashed passwords
  * instead of keeping plaintext account passwords in config files, you can now store hashed ones instead
  * `--ah-alg` specifies algorithm; best to worst: `argon2`, `scrypt`, `sha2`, or the default `none`
  * the default settings of each algorithm takes `0.4 sec` to hash a password, and argon2 eats `256 MiB` RAM
    * can be adjusted with optional comma-separated args after the algorithm name; see `--help-pwhash`
  * `--ah-salt` is the [static salt](https://github.com/9001/copyparty/blob/hovudstraum/docs/devnotes.md#hashed-passwords) for all passwords, and is autogenerated-and-persisted if not specified
  * `--ah-cli` switches copyparty into a shell where you can hash passwords interactively
    * but copyparty will also autoconvert any unhashed passwords on startup and give you the values to insert into the config anyways
* #40 volume size limit
  * volflag `vmaxb` specifies max size of a volume
  * volflag `vmaxn` specifies max number of files in a volume
  * example: `-v [...]:c,vmaxb=900g:c,vmaxn=20k` blocks uploads if the volume reaches 900 GiB or a total of 20480 files
  * good alternative to `--df` since it works per-volume

## bugfixes
* autogenerated TLS certs didn't include the mDNS name

## other changes
* improved cloudflare challenge detection
* markdown edits will now trigger upload hooks



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0611-0814  `v1.7.6`  NO_COLOR

## new features
* #31 `--grid` shows thumbnails instead of file-list by default
* #28 `--unlist` regex-exclude files from browser listings
  * for example `--unlist '\.(js|css)$'` hides all `.js` and `.css` files
  * **purely cosmetic!** the files are still fully accessible, and still appear in API calls
* auto-generate TLS certificates on startup / network-change
  * mostly good for LAN, requires [cfssl](https://github.com/cloudflare/cfssl/releases/latest), can be disabled with `--no-crt`
  * creates a self-signed CA and certs with SANs of all detected server IPs
    * so it's still recommended to use a reverse-proxy / letsencrypt for WAN servers
* the default `--fk-salt` is now much stronger
  * all existing installations will keep the previously selected seed -- you can choose to upgrade by deleting `~/.config/copyparty/cert.pem` but this will change all filekeys / per-file passwords
* the `NO_COLOR` environment-variable is now supported, removing colors from stdout
  * see https://no-color.org/ and more importantly https://youtu.be/biW5UVGkPMA?t=150
  * `--ansi` and `--no-ansi` can also be used to force-enable/disable colored output
* #33 disable colors when stdout is redirected to a pipe/file -- by @clach04 
* #32 simplify building sfx from source
* upgraded [copyparty.exe](https://github.com/9001/copyparty/releases/latest/download/copyparty.exe) to [python 3.11.4](https://pythoninsider.blogspot.com/2023/06/python-3114-31012-3917-3817-3717-and.html)

## bugfixes
* #30 `--ftps` didn't work without `--ftp`
* tiny css bug in light themes (opaque thumbnail controls)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0513-0000  `v1.7.2`  hard resolve

## new features
* print a warning if `c:\`, `c:\windows*`, or all of `/` are shared
* upgraded the docker image to v3.18 which enables the [chiptune player](https://a.ocv.me/pub/demo/music/chiptunes/#af-f6fb2e5f)
* in config files, allow trailing `:` in section headers

## bugfixes
* when `--hardlink` (or the volflag) is set, resolve symlinks before hardlinking
  * uploads could fail due to relative symlinks
* really minor ux fixes
  * left-align `GET` in access logs
  * the upload panel didn't always shrink back down after uploads completed



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0507-1834  `v1.7.1`  CräzY;PWDs

## new features
* webdav:
  * support write-only folders
  * option `--dav-auth` / volflag `davauth` forces clients to always auth
    * helps clients such as `davfs2` see all folders if the root is anon-readable but some subfolders are not
    * alternatively you could configure your client to always send the password in the `PW` header
* include usernames in http request logs
* audio player:
  * consumes less power on phones when the screen is off
  * smoother playback cursor on short songs

## bugfixes
* the characters `;` and `%` can now be used in passwords
  * but non-ascii characters (such as the ä in the release title) can, in fact, not
* verify that all accounts have unique passwords on startup (#25)

## other changes
* ftpd: log incorrect passwords only, not correct ones
* `up2k.py` (the upload, folder-sync, and file-search client) has been renamed to [u2c.py](https://github.com/9001/copyparty/tree/hovudstraum/bin#u2cpy)
  * `u2c` as in `up2k client`, or `up2k CLI`, or `upload-to-copyparty` -- good name
  * now the only things named "up2k" are the web-ui and the server backend which is way less confusing
* upgrade packaging from [setup.py](https://github.com/9001/copyparty/blob/hovudstraum/setup.py) to [pyproject.toml](https://github.com/9001/copyparty/blob/hovudstraum/pyproject.toml)
  * no practical consequences aside from a warm fuzzy feeling of being in the future
* the docker images ~~will be~~ got rebuilt 2023-05-11 ~~in a few days (when [alpine](https://alpinelinux.org/) 3.18 is released)~~ enabling [the chiptune player](https://a.ocv.me/pub/demo/music/chiptunes/#af-f6fb2e5f)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0429-2114  `v1.7.0`  unlinked

don't get excited! nothing new and revolutionary, but `xvol` and `xdev` changed behavior so there's an above-average chance of fresh bugs

## new features
* (#24): `xvol` and `xdev`, previously just hints to the filesystem indexer, now actively block access as well:
  * `xvol` stops users following symlinks leaving the volumes they have access to
    * so if you symlink `/home/ed/music` into `/srv/www/music` it'll get blocked
    * ...unless both folders are accessible through volumes, and the user has read-access to both
  * `xdev` stops users crossing the filesystem boundary of the volumes they have access to
    * so if you symlink another HDD into a volume it'll get blocked, but you can still symlink from other places on the same FS
  * enabling these will add a slight performance hit; the unlikely worst-case is `14%` slower directory listings, `35%` slower download-as-tar
* file selection summary (num files, size, audio duration) in the bottom right
* [u2cli](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py): more aggressive resolving with `--rh`
* [add a warning](https://github.com/9001/copyparty#fix-unreliable-playback-on-android) that the default powersave settings in android may stop playing music during album changes
  * also appears [in the media player](https://user-images.githubusercontent.com/241032/235327191-7aaefff9-5d41-4e42-b71f-042a8247f29d.png) if the issue is detected at runtime (playback halts for 30sec while screen is off)

## bugfixes
* (#23): stop autodeleting empty folders when moving or deleting files
  * but files which expire / [self-destruct](https://github.com/9001/copyparty#self-destruct) still clean up parent directories like before
* ftp-server: some clients could fail to `mkdir` at first attempt (and also complain during rmdir)

## other changes
* new version of [cpp-winpe64.exe](https://github.com/9001/copyparty/releases/download/v1.7.0/copyparty-winpe64.exe) since the ftp-server fix might be relevant



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0426-2300  `v1.6.15`  unexpected boost

## new features
* 30% faster folder listings due to [the very last thing](https://github.com/9001/copyparty/commit/55c74ad1) i'd ever expect to be a bottleneck, [thx perf](https://docs.python.org/3.12/howto/perf_profiling.html)
* option to see the lastmod timestamps of symlinks instead of the target files
  * makes the turbo mode of [u2cli, the commandline uploader and folder-sync tool](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) more turbo since copyparty dedupes uploads by symlinking to an existing copy and the symlink is stamped with the deduped file's lastmod
  * **webdav:** enabled by default (because rclone will want this), can be disabled with arg `--dav-rt` or volflag `davrt`
  * **http:** disabled by default, can be enabled per-request with urlparam `lt`
* [u2cli](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py): option `--rh` to resolve server hostname only once at start of upload
  * fantastic for buggy networks, but it'll break TLS

## bugfixes
* new arg `--s-tbody` specifies the network timeout before a dead connection gets dropped (default 3min)
  * before there was no timeout at all, which could hang uploads or possibly consume all server resources
  * ...but this is only relevant if your copyparty is directly exposed to the internet with no reverse proxy
    * with nginx/caddy/etc you can disable the timeout with `--s-tbody 0` for a 3% performance boost (*wow!*)
* iPhone audio transcoder could turn bad and stop transcoding
* ~~maybe android phones no longer pause playback at the end of an album~~
  * nope, that was due to [android's powersaver](https://github.com/9001/copyparty#fix-unreliable-playback-on-android), oh well
  * ***bonus unintended feature:*** navigate into other folders while a song is plaing
* [installing from the source tarball](https://github.com/9001/copyparty/blob/hovudstraum/docs/devnotes.md#build-from-release-tarball) should be ok now
  * good base for making distro packages probably

## other changes
* since the network timeout fix is relevant for the single usecase that [cpp-winpe64.exe](https://github.com/9001/copyparty/releases/download/v1.6.15/copyparty-winpe64.exe) covers, there is now a new version of that



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0424-0609  `v1.6.14`  unsettable flags

## new features
* unset a volflag (override a global option) by negating it (setting volflag `-flagname`)
* new argument `--cert` to specify TLS certificate location
  * defaults to `~/.config/copyparty/cert.pem` like before

## bugfixes
* in zip/tar downloads, always use the parent-folder name as the archive root
* more reliable ftp authentication when providing password as username
* connect-page: fix rclone ftps example

## other changes
* stop suggesting `--http-only` and `--https-only` for performance since the difference is negligible
* mention how some antivirus (avast, avg, mcafee) thinks that pillow's webp encoder is a virus, affecting `copyparty.exe`



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0420-2141  `v1.6.12`  as seen on nixos

## new features
* @chinponya [made](https://github.com/9001/copyparty/pull/22) a copyparty [Nix package](https://github.com/9001/copyparty#nix-package) and a [NixOS module](https://github.com/9001/copyparty#nixos-module)! nice 🎉
  * with [systemd-based hardening](https://github.com/9001/copyparty/blob/hovudstraum/contrib/nixos/modules/copyparty.nix#L230-L270) instead of [prisonparty](https://github.com/9001/copyparty/blob/hovudstraum/bin/prisonparty.sh)
  * complements the [arch package](https://github.com/9001/copyparty/tree/hovudstraum/contrib/package/arch) very well w

## bugfixes
* fix an sqlite fd leak
  * with enough simultaneous traffic, copyparty could run out of file descriptors since it relied on the gc to close sqlite cursors
  * now there's a pool of cursors shared between the tcp connections instead, limited to the number of CPU cores
  * performance mostly unaffected (or slightly improved) compared to before, except for a 20% reduction only during max server load caused by directory-listings or searches
  * ~~somehow explicitly closing the cursors didn't always work... maybe this was actually a python bug :\\/~~
    * yes, it does incomplete cleanup if opening a WAL database fails
* multirange requests would fail with an error; now they get a 200 as expected (since they're kinda useless and not worth the overhead)
  * [the only software i've ever seen do that](https://apps.kde.org/discover/) now works as intended
* expand `~/` filesystem paths in all remaining args: `-c`, `-lo`, `--hist`, `--ssl-log`, and the `hist` volflag
* never use IPv6-format IPv4 (`::ffff:127.0.0.1`) in responses
* [u2cli](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py): don't enter delete stage if some of the uploads failed
* audio player in safari on touchbar macbooks
  * songs would play backwards because the touchbar keeps spamming play/pause
  * playback would stop when the preloader kicks in because safari sees the new audio object and freaks out

## other changes
* added [windows quickstart / service example](https://github.com/9001/copyparty/blob/hovudstraum/docs/examples/windows.md)
* updated pyinstaller (it makes smaller exe files now)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0401-2112  `v1.6.11`  not joke

## new features
* new event-hook: [exif stripper](https://github.com/9001/copyparty/blob/hovudstraum/bin/hooks/image-noexif.py)
* [markdown thumbnails](https://a.ocv.me/pub/demo/pics-vids/README.md?v) -- see [readme](https://github.com/9001/copyparty#markdown-viewer)
* soon: support for [web-scrobbler](https://github.com/web-scrobbler/web-scrobbler/) - the [Last.fm](https://www.last.fm/user/tripflag) browser extension
  * will update here + readme with more info when [the v3](https://github.com/web-scrobbler/web-scrobbler/projects/5) is out

## bugfixes
* more sqlite query-planner twiddling
  * deleting files is MUCH faster now, and uploads / bootup might be a bit better too
* webdav optimizations / compliance
  * should make some webdav clients run faster than before
  * in very related news, the webdav-client in [rclone](https://github.com/rclone/rclone/) v1.63 ([currently beta](https://beta.rclone.org/?filter=latest)) will be ***FAST!***
    * does cool stuff such as [bidirectional sync](https://github.com/9001/copyparty#folder-sync) between copyparty and a local folder
* [bpm detector](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/audio-bpm.py) is a bit more accurate
* [u2cli](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) / commandline uploader: better error messages if something goes wrong
* readme rendering could fail in firefox if certain addons were installed (not sure which)
* event-hooks: more accurate usage examples

## other changes
* @chinponya automated the prismjs build step (thx!)
* updated some js deps (markedjs, codemirror)
* copyparty.exe: updated Pillow to 9.5.0
* and finally [the joke](https://github.com/9001/copyparty/blob/hovudstraum/contrib/plugins/rave.js) (looks [like this](https://cd.ocv.me/b/d2/d21/#af-9b927c42))



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0320-2156  `v1.6.10`  rclone sync

## new features
* [iPhone "app"](https://github.com/9001/copyparty#ios-shortcuts) (upload shortcut) -- thanks @Daedren !
  * can strip exif, upload files, pics, vids, links, clipboard
  * can download links and rehost the target file on your server
* support `rclone sync` to [sync folders](https://github.com/9001/copyparty#folder-sync) to/from copyparty
  * let webdav clients set lastmodified times during upload
  * let webdav clients replace files during upload

## bugfixes
* [prisonparty](https://github.com/9001/copyparty/blob/hovudstraum/bin/prisonparty.sh): FFmpeg transcoding was slow because there was no `/dev/urandom`
* iphones would fail to play *some* songs (low-bitrate and/or shorter than ~7 seconds)
  * due to either an iOS bug or an FFmpeg bug in the caf remuxing idk
  * fixed by mixing in white noise into songs if an iPhone asks for them
* small correction in the docker readme regarding rootless podman



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0316-2106  `v1.6.9`  index.html

## new features
* option to show `index.html` instead of the folder listing
  * arg `--ih` makes it default-enabled
  * clients can enable/disable it in the `[⚙️]` settings tab
  * url-param `?v` skips it for a particular folder
* faster folder-thumbnail validation on startup (mostly on conventional HDDs) 

## bugfixes
* "load more" button didn't always show up when search results got truncated
* ux: tooltips could block buttons on android



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0312-1610  `v1.6.8`  folder thumbs

* read-only demo server at https://a.ocv.me/pub/demo/
* [docker image](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) ╱ [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) ╱ [client testbed](https://cd.ocv.me/b/)

## new features
* folder thumbnails are indexed in the db
  * now supports non-lowercase names (`Cover.jpg`, `Folder.JPG`)
  * folders without a specific cover/folder image will show the first pic inside
* when audio playback continues into an empty folder, keep trying for a bit
* add no-index hints (google etc) in basic-browser HTML (`?b`, `?b=u`)
* [commandline uploader](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) supports long filenames on win7

## bugfixes
* rotated logfiles didn't get xz compressed
* image-gallery links pointing to a deleted image shows an error instead of a crashpage

## other changes
* folder thumbnails have purple text to differentiate from files
* `copyparty32.exe` starts 30% faster (but is 6% larger)

----

# what to download?
| download link | is it good? | description |
| -- | -- | -- |
| **[copyparty-sfx.py](https://github.com/9001/copyparty/releases/latest/download/copyparty-sfx.py)** | ✅ the best 👍 | runs anywhere! only needs python |
| [a docker image](https://github.com/9001/copyparty/blob/hovudstraum/scripts/docker/README.md) | it's ok | good if you prefer docker 🐋 |
| [copyparty.exe](https://github.com/9001/copyparty/releases/latest/download/copyparty.exe) |  ⚠️ [acceptable](https://github.com/9001/copyparty#copypartyexe) | for [win8](https://user-images.githubusercontent.com/241032/221445946-1e328e56-8c5b-44a9-8b9f-dee84d942535.png) or later; built-in thumbnailer |
| [up2k.exe](https://github.com/9001/copyparty/releases/latest/download/up2k.exe) | ⚠️ acceptable | [CLI uploader](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) as a win7+ exe ([video](https://a.ocv.me/pub/demo/pics-vids/u2cli.webm)) |
| [copyparty32.exe](https://github.com/9001/copyparty/releases/latest/download/copyparty32.exe) | ⛔️ [dangerous](https://github.com/9001/copyparty#copypartyexe) | for [win7](https://user-images.githubusercontent.com/241032/221445944-ae85d1f4-d351-4837-b130-82cab57d6cca.png) -- never expose to the internet! |
| [cpp-winpe64.exe](https://github.com/9001/copyparty/releases/download/v1.6.8/copyparty-winpe64.exe) | ⛔️ dangerous | runs on [64bit WinPE](https://user-images.githubusercontent.com/241032/205454984-e6b550df-3c49-486d-9267-1614078dd0dd.png), otherwise useless |

* except for [up2k.exe](https://github.com/9001/copyparty/releases/latest/download/up2k.exe), all of the options above are equivalent
* the zip and tar.gz files below are just source code
* python packages are available at [PyPI](https://pypi.org/project/copyparty/#files)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0305-2018  `v1.6.7`  fix no-dedup + add up2k.exe

## new features
* controlpanel-connect: add example for webdav automount

## bugfixes
* fix a race which, in worst case (but unlikely on linux), **could cause data loss**
  * could only happen if `--no-dedup` or volflag `copydupes` was set (**not** default)
  * if two identical files were uploaded at the same time, there was a small chance that one of the files would become empty
  * check if you were affected by doing a search for zero-byte files using either of the following:
    * https://127.0.0.1:3923/#q=size%20%3D%200
    * `find -type f -size 0`
  * let me know if you lost something important and had logging enabled!
* ftp: mkdir can do multiple levels at once (support filezilla)
* fix flickering toast on upload finish
* `[💤]` (upload-baton) could disengage if chrome decides to pause the background tab for 10sec (which it sometimes does)

----

## introducing [up2k.exe](https://github.com/9001/copyparty/releases/latest/download/up2k.exe)

the commandline up2k upload / filesearch client, now as a standalone windows exe
* based on python 3.7 so it runs on 32bit windows7 or anything newer
* *no https support* (saves space + the python3.7 openssl is getting old)
* built from b39ff92f so it can do long filepaths and mojibake

----

⭐️ **you probably want [copyparty-sfx.py](https://github.com/9001/copyparty/releases/latest/download/copyparty-sfx.py) below;**
the exe is [not recommended](https://github.com/9001/copyparty#copypartyexe) for longterm use
and the zip and tar.gz files are source code
(python packages are available at [PyPI](https://pypi.org/project/copyparty/#files))



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0226-2030  `v1.6.6`  r 2 0 0

two hundred releases wow
* read-only demo server at https://a.ocv.me/pub/demo/
* [docker image](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) ╱ [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) ╱ [client testbed](https://cd.ocv.me/b/)
* currently fighting a ground fault so the demo server will be unreliable for a while

## new features
* more docker containers! now runs on x64, x32, aarch64, armhf, ppc64, s390x
  * pls let me know if you actually run copyparty on an IBM mainframe 👍
* new [event hook](https://github.com/9001/copyparty/tree/hovudstraum/bin/hooks) type `xiu` runs just once for all recent uploads
  * example hook [xiu-sha.py](https://github.com/9001/copyparty/blob/hovudstraum/bin/hooks/xiu-sha.py) generates sha512 checksum files
* new arg `--rsp-jtr` simulates connection jitter
* copyparty.exe integrity selftest
* ux:
  * return to previous page after logging in
  * show a warning on the login page if you're not using https
  * freebsd: detect `fetch` and return the [colorful sortable plaintext](https://user-images.githubusercontent.com/241032/215322619-ea5fd606-3654-40ad-94ee-2bc058647bb2.png) listing

## bugfixes
* permit replacing empty files only during a `--blank-wt` grace period
* lifetimes: keep upload-time when a size/mtime change triggers a reindex
* during cleanup after an unlink, never rmdir the entire volume
* rescan button in the controlpanel required volumes to be e2ds
* dupes could get indexed with the wrong mtime
  * only affected the search index; the filesystem got the right one
* ux: search results could include the same hit twice in case of overlapping volumes
* ux: upload UI would remain expanded permanently after visiting a huge tab
* ftp: return proper error messages when client does something illegal
* ie11: support the back button

## other changes
* [copyparty.exe](https://github.com/9001/copyparty/releases/latest/download/copyparty.exe) replaces copyparty64.exe -- now built for 64-bit windows 10
  * **on win10 it just works** -- on win8 it needs [vc redist 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48145) -- no win7 support
  * has the latest security patches, but sfx.py is still better for long-term use
  * has pillow and mutagen; can make thumbnails and parse/index media
* [copyparty32.exe](https://github.com/9001/copyparty/releases/latest/download/copyparty32.exe) is the old win7-compatible, dangerously-insecure edition



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0212-1411  `v1.6.5`  windows smb fix + win10.exe

* read-only demo server at https://a.ocv.me/pub/demo/
* [docker image](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) ╱ [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) ╱ [client testbed](https://cd.ocv.me/b/)

## bugfixes
* **windows-only:** smb locations (network drives) could not be accessed
  * appeared in [v1.6.4](https://github.com/9001/copyparty/releases/tag/v1.6.4) while adding support for long filepaths (260chars+)

## other changes
* removed tentative support for compressed chiptunes (xmgz, xmz, xmj, ...) since FFmpeg usually doesn't

----

# introducing [copyparty640.exe](https://github.com/9001/copyparty/releases/download/v1.6.5/copyparty640.exe)
* built for win10, comes with the latest python and deps (supports win8 with [vc redist 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48145))
* __*much* safer__ than the old win7-compatible `copyparty.exe` and `copyparty64.exe`
  * but only `copyparty-sfx.py` takes advantage of the operating system security patches
* includes pillow for thumbnails and mutagen for media indexing
* around 10% slower (trying to figure out what's up with that)

starting from the next release,
* `copyparty.exe` (win7 x32) will become `copyparty32.exe`
* `copyparty640.exe` (win10) will be the new `copyparty.exe`
* `copyparty64.exe` (win7 x64) will graduate

so the [copyparty64.exe](https://github.com/9001/copyparty/releases/download/v1.6.5/copyparty64.exe) in this release will be the "final" version able to run inside a [64bit Win7-era winPE](https://user-images.githubusercontent.com/241032/205454984-e6b550df-3c49-486d-9267-1614078dd0dd.png) (all regular 32/64-bit win7 editions can just use `copyparty32.exe` instead)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0211-1802  `v1.6.4`  🔧🎲🔗🐳🇦🎶

* read-only demo server at https://a.ocv.me/pub/demo/
* [1.6 theme song](https://a.ocv.me/pub/demo/music/.bonus/#af-134e597c) // [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md)

## new features
* 🔧 new [config syntax](https://github.com/9001/copyparty/blob/hovudstraum/docs/example.conf) (#20)
  * the new syntax is still kinda esoteric and funky but it's an improvement
  * old config files are still supported
    * `--vc` prints the autoconverted config which you can copy back into the config file to upgrade
  * `--vc` will also [annotate and explain](https://user-images.githubusercontent.com/241032/217356028-eb3e141f-80a6-4bc6-8d04-d8d1d874c3e9.png) the config files
  * new argument `--cgen` to generate config from commandline arguments
    * kinda buggy, especially the `[global]` section, so give it a lookover before saving it
* 🎲 randomize filenames on upload
  * either optionally, using the 🎲 button in the up2k ui
  * or force-enabled; globally with `--rand` or per-volume with volflag `rand`
  * specify filename length with `nrand` (globally or volflag), default 9
* 🔗 export a list of links to your recent uploads
  * `copy links` in the up2k tab (🚀) will copy links to all uploads since last page refresh,
  * `copy` in the unpost tab (🧯) will copy links to all your recent uploads (max 2000 files / 12 hours by default)
  * filekeys are included if that's enabled and you have access to view those (permissions `G` or `r`)
* 🇦 [arch package](https://github.com/9001/copyparty/tree/hovudstraum/contrib/package/arch) -- added in #18, thx @icxes 
  * maybe in aur soon!
* 🐳 [docker containers](https://github.com/9001/copyparty/tree/hovudstraum/scripts/docker) -- 5 editions,
  * [min](https://hub.docker.com/r/copyparty/min) (57 MiB), just copyparty without thumbnails or audio transcoding
  * [im](https://hub.docker.com/r/copyparty/im) (70 MiB), thumbnails of popular image formats + media tags with mutagen
  * [ac (163 MiB)](https://hub.docker.com/r/copyparty/ac) 🥇 adds audio/video thumbnails + audio transcoding + better tags
  * [iv](https://hub.docker.com/r/copyparty/iv) (211 MiB), makes heif/avic/jxl faster to thumbnail
  * [dj](https://hub.docker.com/r/copyparty/dj) (309 MiB), adds optional detection of musical key / bpm
* 🎶 [chiptune player](https://a.ocv.me/pub/demo/music/chiptunes/#af-f6fb2e5f)
  * transcodes mod/xm/s3m/it/mo3/mptm/mt2/okt to opus
  * uses FFmpeg (libopenmpt) so the accuracy is not perfect, but most files play OK enough
  * not **yet** supported in the docker container since Alpine's FFmpeg was built without libopenmpt
* windows: support long filepaths (over 260 chars)
  * uses the `//?/` winapi syntax to also support windows 7
* `--ver` shows the server version on the control panel

## bugfixes
* markdown files didn't scale properly in the document browser
* detect and refuse multiple volume definitions sharing the same filesystem path
* don't return incomplete transcodes if multiple clients try to play the same flac file
* [prisonparty](https://github.com/9001/copyparty/blob/hovudstraum/bin/prisonparty.sh): more reliable chroot cleanup, sigusr1 for config reload
* pypi packaging: compress web resources, include webdav.bat



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0131-2103  `v1.6.3`  sandbox k

* read-only demo server at https://a.ocv.me/pub/demo/
* and since [1.6.0](https://github.com/9001/copyparty/releases/tag/v1.6.2) only got 2 days of prime time,
  * [1.6 theme song](https://a.ocv.me/pub/demo/music/.bonus/#af-134e597c) (hosted on the demo server)
  * [similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) / feature comparison

## new features
* dotfiles are hidden from search results by default
  * use `--dotsrch` or volflags `dotsrch` / `nodotsrch` to specify otherwise
  * they were already being excluded from tar/zip-files if `-ed` is not set, so this makes more sense -- dotfiles *should* now be undiscoverable unless `-ed` or `--smb` is set, but please use [volumes](https://github.com/9001/copyparty#accounts-and-volumes) for isolation / access-control instead, much safer

## bugfixes
* lots of cosmetic fixes for the new readme/prologue/epilogue sandbox
  * rushed it into the previous release when someone suggested it, bad idea
  * still flickers a bit (especially prologues), and hotkeys are blocked while the sandboxed document has focus
  * can be disabled with `--no-sb-md --no-sb-lg` (not recommended)
* support webdav uploads from davfs2 (fix LOCK response)
* always unlink files before overwriting them, in case they are hardlinks
  * was primarily an issue with `--daw` and webdav clients
* on windows, replace characters in PUT filenames as necessary
* [prisonparty](https://github.com/9001/copyparty/blob/hovudstraum/bin/prisonparty.sh): support opus transcoding on debian
  * `rm -rf .hist/ac` to clear the transcode cache if the old version broke some songs

## other changes
* add `rel="nofollow"` to zip download links, basic-browser link



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0129-1842  `v1.6.2`  cors k

[Ellie Goulding - Stay Awake (kors k Hardcore Bootleg).mp3](https://a.ocv.me/pub/demo/music/.bonus/#af-134e597c)
* 👆 the read-only demo server at https://a.ocv.me/pub/demo/

## breaking changes
but nothing is affected (that i know of):
* all requests must pass [cors validation](https://github.com/9001/copyparty#cors)
  * but they almost definitely did already
  * sharex and others are OK since they don't supply an `Origin` header
* [API calls](https://github.com/9001/copyparty/blob/hovudstraum/docs/devnotes.md#http-api) `?delete` and `?move` are now POST instead of GET
  * not aware of any clients using these

## known issues
* the document sandbox is a bit laggy and sometimes eats hotkeys
  * disable it with `--no-sb-md --no-sb-lg` if you trust everyone who has write and/or move access

## new features
* [event hooks](https://github.com/9001/copyparty/tree/hovudstraum/bin/hooks) -- run programs on new [uploads](https://user-images.githubusercontent.com/241032/215304439-1c1cb3c8-ec6f-4c17-9f27-81f969b1811a.png), renames, deletes
* [configurable cors](https://github.com/9001/copyparty#cors) (cross-origin resource sharing) behavior; defaults are mostly same as before
  * `--allow-csrf` disables all csrf protections and makes it intentionally trivial to send authenticated requests from other domains
* sandboxed readme.md / prologues / epilogues
  * documents can still run scripts like before, but can no longer tamper with the web-ui / read the login session, so the old advice of `--no-readme` and `--no-logues` is mostly deprecated
  * unfortunately disables hotkeys while the text has focus + blocks dragdropping files onto that area, oh well
* password can be provided through http header `PW:` (instead of cookie `cppwd` or or url-param `?pw`)
* detect network changes (new NICs, IPs) and reconfigure / reannoucne zeroconf
  * fixes mdns when running as a systemd service and copyparty is started before networking is up
* add `--freebind` to start listening on IPs before the NIC is up yet (linux-only)
* per-volume deduplication-control with volflags `hardlink`, `neversymlink`, `copydupes`
* detect curl and return a [colorful, sortable plaintext](https://user-images.githubusercontent.com/241032/215322619-ea5fd606-3654-40ad-94ee-2bc058647bb2.png) directory listing instead
* add optional [powered-by-copyparty](https://user-images.githubusercontent.com/241032/215322626-11d1f02b-25f4-45df-a3d9-f8c51354a8eb.png) footnode on the controlpanel
  * can be disabled with `-nb` or redirected with `--pb-url`

## bugfixes
* change some API calls (`?delete`, `?move`) from `GET` to `POST`
  * don't panic! this was safe against authenticated csrf thanks to [SameSite=Lax](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#lax)
  * `--getmod` restores the GETs if you need the convenience and accept the risks
* [u2cli](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) (command-line uploader):
  * recover from network hiccups
  * add `-ns` for slow uefi TTYs
* separate login cookies for http / https
  * avoids an https login from getting accidentally sent over plaintext
  * sadly no longer possible to login with internet explorer 4.0 / windows 3.11
* tar/zip-download of hidden folders
* unpost filtering was buggy for non-ascii characters
* moving a deduplicated file on a volume where deduplication was since disabled
* improved the [linux 6.0.16](https://utcc.utoronto.ca/~cks/space/blog/linux/KernelBindBugIn6016) kernel bug [workaround](https://github.com/9001/copyparty/commit/9065226c) because there is similar funk in 5.x
* add custom text selection colors because chrome is currently broken on fedora
* blockdevs (`/dev/nvme0n1`) couldn't be downloaded as files
* misc fixes for location-based reverse-proxying
* macos dualstack thing

## other changes
* added a collection of [cursed usecases](https://github.com/9001/copyparty/tree/hovudstraum/docs/cursed-usecases)
* and [comparisons to similar software](https://github.com/9001/copyparty/blob/hovudstraum/docs/versus.md) in case you ever wanna jump ship



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2023-0112-0515  `v1.5.6`  many hands

hello from warsaw airport (goodbye japan ;_;)
* read-only demo server at https://a.ocv.me/pub/demo/

## new features
* multiple upload handshakes in parallel
  * around **5x faster** when uploading small files
  * or **50x faster** if the server is on the other side of the planet
    * just crank up the `parallel uploads` like crazy (max is 64)
* upload ui: total time and average speed is shown on completion

## bugfixes
* browser ui didn't allow specifying number of threads for file search
* dont panic if a digit key is pressed while viewing an image
* workaround [linux kernel bug](https://utcc.utoronto.ca/~cks/space/blog/linux/KernelBindBugIn6016) causing log spam on dualstack
  * ~~related issue (also mostly harmless) will be fixed next relese 01077068~~ 
    * they fixed it in linux 6.1 so these workarounds will be gone too



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-1230-0754  `v1.5.5`  made in japan

hello from tokyo
* read-only demo server at https://a.ocv.me/pub/demo/

## new features
* image viewer now supports heif, avif, apng, svg
* [partyfuse and up2k.py](https://github.com/9001/copyparty/tree/hovudstraum/bin): option to read password from textfile

## bugfixes
* thumbnailing could fail if a primitive build of libvips is installed
* ssdp was wonky on dualstack ipv6
* mdns could crash on networks with invalid routes
* support fat32 timestamp precisions
  * fixes spurious file reindexing in volumes located on SD cards on android tablets which lie about timestamps until the next device reboot or filesystem remount



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-1213-1956  `v1.5.3`  folder-sync + turbo-rust

* read-only demo server at https://a.ocv.me/pub/demo/

## new features
* one-way folder sync (client to server) using [up2k.py](https://github.com/9001/copyparty/blob/hovudstraum/bin/README.md#up2kpy) `-z --dr`
  * great rsync alternative when combined with `-e2ds --hardlink` deduplication on the server
* **50x faster** when uploading small files to HDD, especially SMR
  * by switching sqlite to WAL which carries a small chance of temporarily forgetting the ~200 most recent uploads if you have a power outage or your OS crashes; see `--help-dbd` if you have `-mtp` plugins which produces metadata you can't afford to lose
* location-based [reverse-proxying](https://github.com/9001/copyparty/#reverse-proxy) (but it's still recommended to use a dedicated domain/subdomain instead)
* IPv6 link-local automatically enabled for TCP and zeroconf on NICs without a routable IPv6
* zeroconf network filters now accept subnets too, for example `--z-on 192.168.0.0/16`
* `.hist` folders are hidden on windows
* ux:
  * more accurate total ETA on upload
  * sorting of batch-unpost links was unintuitive / dangerous
  * hotkey `Y` turns files into download links if nothing's selected
  * option to replace or disable the mediaplayer-toggle mouse cursor with `--mpmc`

## bugfixes
* WAL probably/hopefully fixes #10 (we'll know in 6 months roughly)
* repair db inconsistencies (which can happen if terminated during startup)
* [davfs2](https://wiki.archlinux.org/title/Davfs2) did not approve of the authentication prompt
* the `connect` button on the control-panel didn't work on phones
* couldn't specify windows NICs in arguments `--z-on` / `--z-off` and friends
* ssdp xml escaping for `--zsl` URL
* no longer possible to accidentally launch multiple copyparty instances on the same port on windows



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-1203-2048  `v1.5.1`  babel

named after [that other thing](https://en.wikipedia.org/wiki/Tower_of_Babel), not [the song](https://soundcloud.com/kanaze/babel-dimension-0-remix)
* read-only demo server at https://a.ocv.me/pub/demo/

## new features
* new protocols!
  * native IPv6 support, no longer requiring a reverse-proxy for that
  * [webdav server](https://github.com/9001/copyparty#webdav-server) -- read/write-access to copyparty straight from windows explorer, macos finder, kde/gnome
  * [smb/cifs server](https://github.com/9001/copyparty#smb-server) -- extremely buggy and unsafe, for when there is no other choice
  * [zeroconf](https://github.com/9001/copyparty#zeroconf) -- copyparty announces itself on the LAN, showing up in various file managers
    * [mdns](https://github.com/9001/copyparty#mdns) -- macos/kde/gnome + makes copyparty available at http://hostname.local/
    * [ssdp](https://github.com/9001/copyparty#ssdp) -- windows
  * commands to mount copyparty as a local disk are in the web-UI at control-panel --> `connect`
* detect buggy / malicious clients spamming the server with idle connections
  * first tries to be nice with `Connection: close` (enough to fix windows-webdav)
  * eventually bans the IP for `--loris` minutes (default: 1 hour)
* new arg `--xlink` for cross-volume detection of duplicate files on upload
* new arg `--no-snap` to disable upload tracking on restart
  * will not create `.hist` folders unless required for thumbnails or markdown backups
* [config includes](https://github.com/9001/copyparty/blob/hovudstraum/docs/example2.conf) -- split your config across multiple config files
* ux improvements
  * hotkey `?` shows a summary of all the hotkeys
  * hotkey `Y` to download selected files
  * position indicator when hovering over the audio scrubber
  * textlabel on the volume slider
  * placeholder values in textboxes
  * options to hide scrollbars, compact media player, follow playing song
  * phone-specific
    * buttons for prev/next folder
    * much better ui for hiding folder columns

## bugfixes
* now possible to upload files larger than 697 GiB
  * technically a [breaking change](https://github.com/9001/copyparty#breaking-changes) if you wrote your own up2k client
    * please let me know if you did because that's awesome
* several macos issues due to hardcoded syscall numbers
* sfx: fix python 3.12 support (forbids nullbytes in source code)
* use ctypes to discover network config -- fixes grapheneos, non-english windows
* detect firefox showing stale markdown documents in the editor
* detect+ban password bruteforcing on ftp too
* http 206 failing on empty files
* incorrect header timestamps on non-english locales
* remind ftp clients that you cannot cd into an image file -- fixes kde dolphin
* ux fixes
  * uploader survives running into inaccessible folders
  * middleclick documents in the textviewer sidebar to open in a new tab
  * playing really long audio files (1 week or more) would spinlock the browser

## other changes
* autodetect max number of clients based on OS limits
  * `-nc` is probably no longer necessary when running behind a reverse-proxy
* allow/try playing mkv files in chrome
* markdown documents returned as plaintext unless `?v`
* only compress `-lo` logfiles if filename ends with `.xz`
* changed sfx compression from bz2 to gz
  * startup is slightly faster
  * better compatibility with embedded linux
* copyparty64.exe -- 64bit edition for [running inside WinPE](https://user-images.githubusercontent.com/241032/205454984-e6b550df-3c49-486d-9267-1614078dd0dd.png)
  * which was an actual feature request, believe it or not!
* more attempts at avoiding the [firefox fd leak](https://bugzilla.mozilla.org/show_bug.cgi?id=1790500)
  * if you are uploading many small files and the browser keeps crashing, use chrome instead
    * or the commandline client, which is now available for download straight from copyparty
      * control-panel --> `connect` --> `up2k.py`



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-1013-1937  `v1.4.6`  wav2opus

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: *This version*

## bugfixes
* the option to transcode flac to opus while playing audio in the browser was supposed to transcode wav-files as well, instead of being extremely hazardous to mobile data plans (sorry)
* `--license` didn't work if copyparty was installed from `pip`



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-1009-0919  `v1.4.5`  qr-code

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* display a server [qr-code](https://github.com/9001/copyparty#qr-code) [(screenshot)](https://user-images.githubusercontent.com/241032/194728533-6f00849b-c6ac-43c6-9359-83e454d11e00.png) on startup
  * primarily for running copyparty on a phone and accessing it from another
  * optionally specify a path or password with `--qrl lootbox/?pw=hunter2`
  * uses the server's exteral ip (default route) unless `--qri` specifies a domain / ip-prefix
  * classic cp437 `▄` `▀` for space efficiency; some misbehaving terminals / fonts need `--qrz 2`
* new permission `G` returns the filekey of uploaded files for users without read-access
  * when combined with permission `w` and volflag `fk`, uploaded files will not be accessible unless the filekey is provided in the url, and `G` provides the filekey to the uploader unlike `g`
* filekeys are added to the unpost listing

## bugfixes
* renaming / moving folders is now **at least 120x faster**
  * and that's on nvme drives, so probably like 2000x on HDDs
* uploads to volumes with lifetimes could get instapurged depending on browser and browser settings
* ux fixes
  * FINALLY fixed messageboxes appearing offscreen on phones (and some other layout issues)
  * stop asking about folder-uploads on phones because they dont support it
  * on android-firefox, default to truncating huge folders with the load-more button due to ff onscroll being buggy
  * audioplayer looking funky if ffmpeg unavailable
* waveform-seekbar cache expiration (the thumbcleaner complaining about png files)
* ie11 panic when opening a folder which contains a file named `up2k`
  * turns out `<a name=foo>` becomes `window.foo` unless that's already declared somewhere in js -- luckily other browsers "only" do that with IDs



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0926-2037  `v1.4.3`  signal in the noise

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* `--bak-flips` saves a copy of corrupted / bitflipped up2k uploads
  * comparing against a good copy can help pinpoint the culprit
  * also see [tracking bitflips](https://github.com/9001/copyparty/blob/hovudstraum/docs/notes.sh#:~:text=tracking%20bitflips)

## bugfixes
* some edgecases where deleted files didn't get dropped from the db
  * can reduce performance over time, hitting the filesystem more than necessary



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0925-1236  `v1.4.2`  fuhgeddaboudit

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* forget incoming uploads by deleting the name-reservation
  * (the zerobyte file with the actual filename, not the .PARTIAL)
  * can take 5min to kick in

## bugfixes
* zfs on ubuntu 20.04 would reject files with big unicode names such as `148. Профессор Лебединский, Виктор Бондарюк, Дмитрий Нагиев - Я её хой (Я танцую пьяный на столе) (feat. Виктор Бондарюк & Дмитрий Нагиев).mp3`
  * usually not a problem since copyparty truncates names to fit filesystem limits, except zfs uses a nonstandard errorcode
* in the "print-message-to-serverlog" feature, a unicode message larger than one tcp-frame could decode incorrectly



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0924-1245  `v1.4.1`  fix api compat

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# bugfixes
* [v1.4.0](https://github.com/9001/copyparty/releases/tag/v1.4.0) accidentally required all clients to use the new up2k.js to continue uploading; support the old js too



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0923-2053  `v1.4.0`  mostly reliable

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* huge folders are lazily rendered for a massive speedup, #11
  * also reduces the number of `?tree` requests; helps a tiny bit on server load
* [selfdestruct timer](https://github.com/9001/copyparty#self-destruct) on uploaded files -- see link for howto and side-effects
* ban clients trying to bruteforce passwords
  * arg `--ban-pw`, default `9,60,1440`, bans for 1440min after 9 wrong passwords in 60min
  * clients repeatedly trying the same password (due to a bug or whatever) are not counted
  * does a `/64` range-ban for IPv6 offenders
  * arg `--ban-404`, disabled by default, bans for excessive 404s / directory-scanning
    * but that breaks up2k turbo-mode and probably some other eccentric usecases
* waveform seekbar [(screenshot)](https://user-images.githubusercontent.com/241032/192042695-522b3ec7-6845-494a-abdb-d1c0d0e23801.png)
* the up2k upload button can do folders recursively now
  * but only a single folder can be selected at a time, making drag-drop the obvious choice still
* gridview is now less jank, #12
* togglebuttons for desktop-notifications and audio-jingle when upload completes
* stop exposing uploader IPs when avoiding filename collisions
  * IPs are now HMAC'ed with urandom stored at `~/.config/copyparty/iphash`
* stop crashing chrome; generate PNGs rather than SVGs for filetype icons
* terminate connections with SHUT_WR and flush with siocoutq
  * makes buggy enterprise proxies behave less buggy
  * do a read-spin on windows for almost the same effect
* improved upload scheduling
  * unfortunately removes the `0.0%, NaN:aN, N.aN MB/s` easteregg
* arg `--magic` enables filetype detection on nameless uploads based on libmagic
* mtp modifiers to let tagparsers keep their stdout/stderr instead of capturing
  * `c0` disables all capturing, `c1` captures stdout only, `c2` only stderr, and `c3` (default) captures both
* arg `--write-uplog` enables the old default of writing upload reports on POSTs
  * kinda pointless and was causing issues in prisonparty
* [upload modifiers](https://github.com/9001/copyparty#write) for terse replies and to randomize filenames
* other optimizations
  * 30% faster tag collection on directory listings
  * 8x faster rendering of huge tagsets
* new mtps [guestbook](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/guestbook.py) and [guestbook-read](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/guestbook-read.py), for example for comment-fields on uploads
* arg `--stackmon` now takes dateformat filenames to produce multiple files
* arg `--mtag-vv` to debug tagparser configs
* arg `--version` shows copyparty version and exits
* arg `--license` shows a list of embedded dependencies + their licenses
* arg `--no-forget` and volflag `:c,noforget` keeps deleted files in the up2k db/index
  * useful if you're shuffling uploads to s3/gdrive/etc and still want deduplication

## bugfixes
* upload deduplication using symlinks on windows
* increase timeouts to run better on servers with extremely overloaded HDDs
  * arg `--mtag-to` (default 60 sec, was 10) can be reduced for faster tag scanning
* incorrect filekeys for files symlinked into another volume
* playback could start mid-song if skipping back and forth between songs
* use affinity mask to determine how many CPU cores are available
* restore .bin-suffix for nameless PUT/POSTs (disappeared in v1.0.11)
* fix glitch in uploader-UI when upload queue is bigger than 1 TiB
* avoid a firefox race-condition accessing the navigation history
* sfx tmpdir keepalive when flipflopping between unix users
* reject anon ftp if anon has no read/write
* improved autocorrect for poor ffmpeg builds
* patch popen on older pythons so collecting tags on windows is always possible
* misc ui/ux fixes
  * filesearch layout in read-only folders
  * more comfy fadein/fadeout on play/pause
  * total-ETA going crazy when an overloaded server drops requests
  * stop trying to play into the next folder while in search results
  * improve warnings/errors in the uploader ui
    * some errors which should have been warnings are now warnings
    * autohide warnings/errors when they are remedied
  * delay starting the audiocontext until necessary
    * reduces cpu-load by 0.2% and fixes chrome claiming the tab is playing audio

# copyparty.exe

now introducing [copyparty.exe](https://github.com/9001/copyparty/releases/download/v1.4.0/copyparty.exe)!   only suitable for the rainiest of days ™

[first thing you'll see](https://user-images.githubusercontent.com/241032/192070274-bfe0bfef-2293-40fc-8852-fcf4f7a90043.png) when you run it is a warning to **«please use the [python-sfx](https://github.com/9001/copyparty/releases/latest/download/copyparty-sfx.py) instead»**,
* `copyparty.exe` was compiled using 32bit python3.7 to support windows7, meaning it won't receive any security patches
* `copyparty-sfx.py` uses your system libraries instead so it'll stay safe for much longer while also having better performance

so the exe might be super useful in a pinch on a secluded LAN but otherwise *Absolutely Not Recommended*

you can download [ffmpeg](https://ocv.me/stuff/bin/ffmpeg.exe) and [ffprobe](https://ocv.me/stuff/bin/ffprobe.exe) into the same folder if you want multimedia-info, audio-transcoding or thumbnails/spectrograms/waveforms -- those binaries were [built](https://github.com/9001/copyparty/tree/hovudstraum/scripts/pyinstaller#ffmpeg) with just enough features to cover what copyparty wants, but much like copyparty.exe itself (so due to security reasons) it is strongly recommended to instead grab a [recent official build](https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip) every once in a while

## and finally some good news

* the chrome memory leak will be [fixed in v107](https://bugs.chromium.org/p/chromium/issues/detail?id=1354816)
* and firefox may fix the crash in [v106 or so](https://bugzilla.mozilla.org/show_bug.cgi?id=1790500)
* and the release title / this season's codename stems from a cpp instance recently being slammed with terabytes of uploads running on a struggling server mostly without breaking a sweat 👍



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0818-1724  `v1.3.16`  gc kiting

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## bugfixes
* found a janky workaround for [the remaining chrome wasm gc bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1354816)
  * worker-global typedarray holding on to the first and last byte of the filereader output while wasm chews on it
  * overhead is small enough, slows down firefox by 2~3%
  * seems to work on many chrome versions but no guarantees
    * still OOM's some 93 and 97 betas, probably way more 

## other changes
* disable `mt` by default on https-desktop-chrome
  * avoids the gc bug entirely (except for plaintext-http and phones)
  * chrome [doesn't parallelize](https://bugs.chromium.org/p/chromium/issues/detail?id=1352210) `crypto.subtle.digest` anyways



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0817-2302  `v1.3.15`  pls let me stop finding chrome bugs

two browser-bugs in two hours, man i just wanna play horizon
* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## bugfixes
* chrome randomly running out of memory while hashing files and `mt` is enabled
  * the gc suddenly gives up collecting the filereaders
  * fixed by reusing a pool of readers instead
* chrome failing to gc Any Buffers At All while hashing files and `mt` is enabled on plaintext http
  * this one's funkier, they've repeatedly fixed and broke it like 6 times between chrome 84 and 106
  * looks like it just forgets about everything that's passed into wasm
  * no way around it, just show a popup explaining how to disable multithreaded hashing



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0815-1825  `v1.3.14`  fix windows db

after two exciting releases, time for something boring
* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* upload-info (ip and timestamp) is provided to `mtp` tagparser plugins as json
* tagscanner will index `fmt` (file-format / container type) by default
  * and `description` can be enabled in `-mte`

## bugfixes
* [v1.3.12](https://github.com/9001/copyparty/releases/tag/v1.3.12) broke file-indexing on windows if an entire HDD was mounted as a volume



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0812-2258  `v1.3.12`  quickboot

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
*but wait, there's more!*   not only do you get the [multithreaded file hashing](https://github.com/9001/copyparty/releases/tag/v1.3.11) but also --
* faster bootup and volume reindexing when `-e2ds` (file indexing) is enabled
  * `3x` faster is probably the average on most instances; more files per folder = faster
  * `9x` faster on a 36 TiB zfs music/media nas with `-e2ts` (metadata indexing), dropping from 46sec to 5sec
  * and `34x` on another zfs box, 63sec -> 1.8sec
  * new arg `--no-dhash` disables the speedhax in case it's buggy (skipping files or audio tags)
* add option `--exit idx` to abort and shutdown after volume indexing has finished

## bugfixes
* [u2cli](https://github.com/9001/copyparty/tree/hovudstraum/bin#up2kpy): detect and skip uploading from recursive symlinks
* stop reindexing empty files on startup
* support fips-compliant cpython builds
  * replaces md5 with sha1, changing the filetype-associated colors in the gallery view



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0810-2135  `v1.3.11`  webworkers

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* multithreaded file hashing! **300%** average speed increase
  * when uploading files through the browser client, based on web-workers
    * `4.5x` faster on http from a laptop -- `146` -> `670` MiB/s
    * ` 30%` faster on https from a laptop -- `552` -> `716` MiB/s
    * `4.2x` faster on http from android -- `13.5` -> `57.1` MiB/s
    * `5.3x` faster on https from android -- `13.8` -> `73.3` MiB/s
    * can be disabled using the `mt` togglebtn in the settings pane, for example if your phone runs out of memory (it eats ~250 MiB extra RAM)
  * `2.3x` faster [u2cli](https://github.com/9001/copyparty/tree/hovudstraum/bin#up2kpy) (cmd-line client) -- `398` -> `930` MiB/s
  * `2.4x` faster filesystem indexing on the server
  * thx to @kipukun for the webworker suggestion!

## bugfixes
* ux: reset scroll when navigating into a new folder
* u2cli: better errormsg if the server's tls certificate got rejected
* js: more futureproof cloudflare-challenge detection (they got a new one recently)

## other changes
* print warning if the python interpreter was built with an unsafe sqlite
* u2cli: add helpful messages on how to make it run on python 2.6

**trivia:** due to a [chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1352210), http can sometimes be faster than https now ¯\\\_(ツ)\_/¯



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0803-2340  `v1.3.10`  folders first

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* faster
  * tag scanner
  * on windows: uploading to fat32 or smb
* toggle-button to sort folders before files (default-on)
  * almost the same as before, but now also when sorting by size / date
* repeatedly hit `ctrl-c` to force-quit if everything dies
* new file-indexing guards
  * `--xdev` / volflag `:c,xdev` stops if it hits another filesystem (bindmount/symlink)
  * `--xvol` / volflag `:c,xvol` does not follow symlinks pointing outside the volume
  * only affects file indexing -- does NOT prevent access!

## bugfixes
* forget uploads that failed to initialize (allows retry in another folder)
* wrong filekeys in upload response if volume path contained a symlink
* faster shutdown on `ctrl-c` while hashing huge files
* ux: fix navpane covering files on horizontal scroll

## other changes
* include version info in the base64 crash-message
* ux: make upload errors more visible on mobile



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0727-1407  `v1.3.8`  more async

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* new arg `--df 4` and volflag `:c,df=4g` to guarantee 4 GiB free disk space by rejecting uploads
* some features no longer block new uploads while they're processing
  * `-e2v` file integrity checker
  * `-e2ts` initial tag scanner
  * hopefully fixes a [deadlock](https://www.youtube.com/watch?v=DkKoMveT_jo&t=3s) someone ran into (but probably doesn't)
    * (the "deadlock" link is an addictive demoscene banger -- the actual issue is #10)
* reduced the impact of some features which still do
  * defer `--re-maxage` reindexing if there was a write (upload/rename/...) recently
    * `--db-act` sets minimum idle period before reindex can start (default 10sec)
* bbox / image-viewer: add video hotkeys 0..9 to seek 0%..90%
* audio-player: add audio crossfeed (left-right channel mixer / vocal isolation)
* splashpage (`/?h`) shows time since the most recent write

## bugfixes
* a11y:
  * enter-key should always trigger onclick
  * only focus password box if in-bounds
  * improve skip-to-files
* prisonparty: volume labeling in root folders
* other minor stuff
  * forget deleted shadowed files from the db
  * be less noisy if a client disconnects mid-reply
  * up2k.js less eager to thrash slow server HDDs

## other changes
* show client's upload ETA in server log
* dump stacks and issue `lsof` on the db if a transaction is stuck
  * will hopefully help if there's any more deadlocks
* [up2k-hook-ytid](https://github.com/9001/copyparty/blob/hovudstraum/contrib/plugins/up2k-hook-ytid.js) (the overengineered up2k.js plugin example) now has an mp4/webm/mkv metadata parser



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0716-1848  `v1.3.7`  faster

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* `up2k.js`: **improved upload speeds!**
  * **...when there's many small files** (or the browser is slow)
    * add [potato mode](https://user-images.githubusercontent.com/241032/179336639-8ecc01ea-2662-4cb6-8048-5be3ad599f33.png) -- lightweight UI for faster uploads from slow boxes
    * enables automatically if it detects a cpu bottleneck (not very accurate)
  * **...on really fast connections (LAN / fiber)**
    * batch progress updates to reduce repaints
  * **...when there is a mix of big and small files**
    * sort the uploads by size, smallest first, for optimal cpu/network usage
      * can be overridden to alphabetical order in the settings tab
      * new arg `--u2sort` changes the default + overrides the override button
    * improve upload pacing when alphabetical order is enabled
      * mainly affecting single files that are 300 GiB + 
* `up2k.js`: add [up2k hooks](https://github.com/9001/copyparty/blob/hovudstraum/contrib/plugins/up2k-hooks.js)
  * specify *client-side* rules to reject files as they are dropped into the browser
  * not a hard-reject since people can use [up2k.py](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) and whatnot, more like a hint
* `up2k.py`: add file integrity checker
  * new arg `-e2v` to scan volumes and verify file checksums on startup
  * `-e2vu` updates the db on mismatch, `-e2vp` panics
  * uploads are blocked while the scan is running -- might get fixed at some point
    * for now it prints a warning
* bbox / image-viewer: doubletap a picture to enter fullscreen mode
* md-editor: `ctrl-c/x` affects current line if no selection, and `ctrl-e` is fullscreen
* tag-parser plugins:
  * add support for passing metadata from one mtp to another (parser dependencies)
    * the `p` flag in [vidchk](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/vidchk.py) usage makes it run after the base parser, eating its output
  * add [rclone uploader](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/rclone-upload.py) which optionally and by default depends on vidchk

## bugfixes
* sfx would crash if it got the same PID as recently (for example across two reboots)
* audio equalizer on recent chromes
  * still can't figure out why chrome sometimes drops the mediasession
* bbox: don't attach click events to videos
* up2k.py:
  * more sensible behavior w/ blank files
  * avoid some extra directory scans when deleting files
  * faster shutdown on `ctrl-c` during volume indexing
* warning from the thumbnail cleaner if the volume has no thumbnails
* `>fixing py2 support` `>2022`

## other changes
* up2k.js:
  * sends a summary of the upload queue to [the server log](https://github.com/9001/copyparty#up2k)
  * shows a toast while loading huge filedrops to indicate it's still alive
* sfx: disable guru meditation unless running on windows
  * avoids hanging systemd on certain crashes
* logs the state of all threads if sqlite hits a timeout



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0706-0029  `v1.3.5`  sup cloudflare

* read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* detect + recover from cloudflare ddos-protection memes during upload
  * while carefully avoiding any mention of "DDoS" in the JS because enterprise firewalls do not enjoy that
* new option `--favico` to specify a default favicon
  * set to `🎉` by default, which also enables the fancy upload progress donut 👌
* baguettebox (image/video viewer):
  * toolbar button `⛶` to enter fullscreen mode (same as hotkey `F`)
  * tap middle of screen to show/hide toolbar
  * tap left/right-side of pics to navigate prev/next
  * hotkeys `[` and `]` to set A-B loop in videos
    * and [URL parameters](https://a.ocv.me/pub/demo/pics-vids/#gf-e2e482ae&t=4.2-6) for that + [initial seekpoint](https://a.ocv.me/pub/demo/pics-vids/#gf-c04bb0f6&t=26s) (same as the audio player)

## bugfixes
* when a tag-parser hits the timeout, `pkill` all its descendants too
  * and a [new mtp flag](https://github.com/9001/copyparty/#file-parser-plugins) to override that; `kt` (kill tree, default), `km` (kill main, old default), `kn` (kill none)
* cpu-wasting spin while waiting for the final handful of files to finish tag-scraping
* detection of sparse-files support inside [prisonparty](https://github.com/9001/copyparty/tree/hovudstraum/bin#prisonpartysh) and other strict jails
* baguettebox (image/video viewer):
  * crash on swipe during close
* didn't reset terminal color at the end of `?ls=v`
* don't try to thumbnail empty files (harmless but dumb)

## other changes
* ux improvements
  * hide the uploads table until something happens
* bump codemirror to 5.65.6



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0627-2057  `v1.3.3`  sdcardfs

* **new:** read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## bugfixes
* **upload:** downgrade filenames to ascii if the server filesystem requires it
  * **android fix:** external sdcard seems to be UCS-2 which can't into emojis
* **upload:** accurate detection of support for sparse files
  * now based on filesystem behavior rather than a list of known filesystems
    * **android fix:** all storage is `sdcardfs` so the list wasn't good enough
* **ux:** custom css/js did not apply to write-only folders



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0619-2331  `v1.3.2`  think im out of titles

* **new:** read-only demo server at https://a.ocv.me/pub/demo/
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* new option `--thickfs` to modify the list of filesystems that dont support sparse files
  * default should catch most usual cases but I probably missed some
* detect and warn if filesystem was expected to support sparse files yet doesn't

## bugfixes
* nonsparse: ensure chunks are flushed on linux as well
* switching between documents
* ctrl-clicking a breadcrumb entry didn't open a new tab as expected
* renaming files based on artist/title/etc tags would create subdirectories if tags contained `/`
  * not dangerous -- the server correctly prevented any path traversals -- just unexpected
* markdown stuff
  * numbered lists appeared as bullet-lists
  * don't crash if a plugin sets a buggy timer
  * plugins didn't run when viewing `README.md` inline

## other changes
* in the `-ss` safety preset, replace `no-dot-mv, no-dot-ren` with `no-logues, no-readme`
* audio player continues into the next folder by default




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0616-1956  `v1.3.1`  types

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* improved support for filesystems without sparse files (fat32, exfat, hpfs)
  * the server no longer preallocates the whole file with zeroes before upload can start
  * so you can now finally run copyparty on your android phone or tablet and upload to the sd-card instead of the internal storage
  * however upload speed will suffer a bit (limited to a single tcp connection doing one chunk at a time)
* safety profiles; arguments `-s`, `-ss`, and `-sss` are aliases/presets for other safety-related arguments
  * `-s` reduces attack surface from potentially dangerous software by disabling thumbnails, audio transcoding, ffmpeg, pillow, vips
  * `-ss` also prevents js-injection, accidental move/deletes, broken symlinks, and enables enterprise-grade security (return 404 on 403)
  * `-sss` also enables logging to disk and does a scan for dangerous symlinks at startup (possibly expensive)
* ux improvements
  * a11y jumpers -- hit tab + enter to jump straight to files/folders
  * hotkey `Y` to download currently playing song / vid / pic
  * button to reset the hidden columns
  * new themes "hacker" and "hi-con"

## bugfixes
* spinlock if a client disconnects in the middle of an up2k handshake
* ftp server couldn't persist metadata when multiprocessing was enabled (`-j 0`)
* cut/paste (move) files between filesystems
* allow `Connection: keep-alive` on HTTP/1.0
* stray `[` appeared at the start of logfiles in the textviewer
* misleading log message when a completed upload expires from registry and `-e2d` was not set

## other changes
* the basic uploader adds the `.PARTIAL` suffix while uploading (like up2k)
* added type hints / mypy checking
* upgrade deps (markedjs, codemirror)
* ux improvements
  * delay spinners a bit
  * instant feedback when switching folders
  * a11y outlines in up2k ui




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0522-1502  `v1.3.0`  god dag

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* i18n! multilingual client
  * new option `--lang nor` to set default language
  * english and norwegian
    * add your own language at the top of [browser.js](https://github.com/9001/copyparty/blob/hovudstraum/copyparty/web/browser.js) and [splash.js](https://github.com/9001/copyparty/blob/hovudstraum/copyparty/web/splash.js) and send a pr :^)
  * build an english-only sfx with `./scripts/make-sfx.sh lang eng` (or `eng|nor` for english and norwegian)
  * translation is incomplete but covers the most important / common stuff
* show download progress while opening huge textfiles
* add unix-extrafield to zipfiles for utc timestamps
  * zip spec says the regular timestamp is supposed to be localtime :||||
  * only helps on linux and will rollaround in 2038 but should be OK because the msdos field doesn't until 2100
  * couldn't get ntfs-extrafields to work (supposed to be utc but idgi), would have been better, oh well
* ux tweaks
  * remember videoplayer preferences
  * confirmation messages
    * hiding a column for the first time
    * opening a huge textfile
    * destination in upload msg

## bugfixes
* dont switch to treeview when playback continues into the next folder

## other changes
* updated deps (markedjs, codemirror, prismjs)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0513-1524  `v1.2.11`  big docs

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## bugfixes

this release fixes #9 (denial-of-service), thx to @chinponya for the report!

* large files no longer embed if you `?doc=some.mkv`
  * stops copyparty from eating all your RAM
  * js will stream the file afterwards instead
* disable selection of search results
  * didn't serve a purpose, was just confusing



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0512-2344  `v1.2.10`  in addition

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## bugfixes
* huge speed boost on huge databases (4'000'000+ files)
  * improves initial tag scans when indexing new files
  * should also improve directory listings, search results



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0512-2110  `v1.2.9`  monokai

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* automatic logout after `--logout` minutes of inactivity
* show originating path to dangerous symlinks during `--ls` validation

## bugfixes
* dont try to index nonregular files when scanning filesystem
* start filesystem indexing even if no interfaces could bind
* fix minor issues when using a symlink as webroot
* fix filekeys in the basic-html browser
* support login on ie4 / win3.11
* restore minimal support for browsers without css-variables [(makes ie11 look surprisingly dope)](https://user-images.githubusercontent.com/241032/166340135-c59b9ced-5dbe-45d9-9025-285f0ffb5a49.png)

## other changes
* redirect to webroot after login instead of the controlpanel
* improve readability of the upload dropzone for smaller screens
* complain loudly if FFmpeg segfaults on a file
  * grep your logs for `<Signals.SIG` to investigate
* safer systemd service example
* other minor ux fixes
  * change focus in modals between ok/cancel with left/right keys
  * removed the option to disable spa (nobody's mentioned any issues)
  * compensate for play/pause fades by rewinding a bit
  * focus the password field if not logged in
  * [theme 2 is now monokai](https://user-images.githubusercontent.com/241032/168170566-bf71c3e0-d068-43cd-a277-f797184a702e.png) (the protonmail edition)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0430-0016  `v1.2.8`  windows++

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## new features
* new themes `vice` and the windows 3.1 masterpiece `hotdog stand`

<table><tr><td width="33%" align="center"><a href="https://user-images.githubusercontent.com/241032/165864907-17e2ac7d-319d-4f25-8718-2f376f614b51.png"><img src="https://user-images.githubusercontent.com/241032/165867551-fceb35dd-38f0-42bb-bef3-25ba651ca69b.png"></a>
0. classic dark</td><td width="33%" align="center"><a href="https://user-images.githubusercontent.com/241032/165864904-c5b67ddd-f383-4b9e-9f5a-a3bde183d256.png"><img src="https://user-images.githubusercontent.com/241032/165867556-077b6068-2488-4fae-bf88-1fce40e719bc.png"></a>
2. flat dark</td><td width="33%" align="center"><a href="https://user-images.githubusercontent.com/241032/165864901-db13a429-a5da-496d-8bc6-ce838547f69d.png"><img src="https://user-images.githubusercontent.com/241032/165867560-aa834aef-58dc-4abe-baef-7e562b647945.png"></a>
4. vice</td></tr><tr><td align="center"><a href="https://user-images.githubusercontent.com/241032/165864905-692682eb-6fb4-4d40-b6fe-27d2c7d3e2a7.png"><img src="https://user-images.githubusercontent.com/241032/165867555-080b73b6-6d85-41bb-a7c6-ad277c608365.png"></a>
1. classic light</td><td align="center"><a href="https://user-images.githubusercontent.com/241032/165864903-7fba1cb9-036b-4f11-90d5-28b7c0724353.png"><img src="https://user-images.githubusercontent.com/241032/165867557-b5cc0010-d880-48b1-8156-9c84f7bbc521.png"></a>
3. flat light
</td><td align="center"><a href="https://user-images.githubusercontent.com/241032/165864898-10ce7052-a117-4fcf-845b-b56c91687908.png"><img src="https://user-images.githubusercontent.com/241032/165867562-f3003d45-dd2a-4564-8aae-fed44c1ae064.png"></a>
5. <a href="https://blog.codinghorror.com/a-tribute-to-the-windows-31-hot-dog-stand-color-scheme/">hotdog stand</a></td></tr></table>

* `search:` button to load more search results, starting at 125 instead of 1000, now much better on slow PCs
* `search:` immediately perform a search when the enter key is pressed
* `uploader:` optimal column sizing in the uploader depending on which tab is selected (done/busy/queued)
* `uploader:` new option `--turbo` to change the default settings of the turbo-mode in the uploader
  * `0` (default) is the old behavior, `1` disables the warning when enabling turbo, `2` enables turbo, `3` also disables the datecheck
  * see the tooltip in the settings tab for more info; basically it skips the file contents verification and instead relies on filesize and timestamp to guess if a file was uploaded already, useful for massive upload batches that got interrupted

## bugfixes
* `httpd:` a theoretical XSS opening -- copyparty would echo bad requests as html
  * it still does that, but now with plaintext content-type
  * was mostly-harmless -- can't really think of a way to exploit it since it'd only happen on invalid HTTP requests
* `httpd:` better errorhandling on invalid requests in general
* **windows-only:** `httpd:` deadlocks when trying to access files with illegal filenames on windows
  * files containing characters `:*<|>"/?\` or names starting with `con.`, `prn.`, `aux.`, `nul.`
  * for example `aux.c` when unpacking the linux source code on a flashdrive and plugging it into a windows rig
* **windows-only:** `database:` deadlock if a search was done during the initial filesystem scan
* `database:` deadlock if an upload was done during a filesystem scan (either initial or periodic rescan)
* `client:` javascript crash when linking someone an audio URL and they'd never visited before
* `client:` ignore bugs in the developer console (in future versions of chrome)
* `uploader:` timestamps of zero-byte uploads were not set
* `database:` skip busy files during a filesystem rescan
* `media player:` sending artist / title info to the OS broke at some point

## other changes
* changed the themes to use css variables for colors, making it way easier (hopefully) to make your own themes
* mention [chrome issue 1317069](https://bugs.chromium.org/p/chromium/issues/detail?id=1317069) in the readme
* improved the `--help` text




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0416-2144  `v1.2.7`  write-only unpost

fixed another dumdum, sorry for the spam
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# bugfixes
* allow unpost with write-only permissions




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0415-1809  `v1.2.6`  hardlink

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* new arg `--hardlink` tries to hardlink instead of symlink when receiving a duplicate file through up2k
* new arg `--never-symlink` disables the fallback to symlink if hardlink fails, making a full dupe
  * `--no-symlink` was renamed to `--no-dedup`

# bugfixes
* some css color issues introduced in v1.2.4, mainly in markdown documents
* setting mtimes / last-modified on up2k uploads when running on windows



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0414-1945  `v1.2.4`  the thumbs and themes update

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* gallery URLS -- copy the URL while viewing an image/video in the gallery
* option to change/disable the gallery animations in the UI
  * default from OS preferences through `prefers-reduced-motion`
* decode terminal colors when viewing `diz`, `ans`, `log` textfiles
* thumbnails:
  * option to use `pyvips` instead of (or in addition to) `pillow`, 3x faster than pillow
  * add `ffmpeg` as fallback for creating thumbnails of pictures too, 3x slower than pillow
    * so now it can read jpeg-xl files + a bunch more
      * including pdf which is disabled by default because scary
  * new args to specify which file formats to read using which backend
    * `--th-r-pil`, `--th-r-vips`, `--th-r-ffi`, `--th-r-ffv`, `--th-r-ffa`
  * new arg `--th-dec` specifies backend preference, default `pyvips` > `pillow` > `ffmpeg`
  * volflags to disallow thumbnails inside specific volumes
    * `dvthumb` for video, `dathumb` for audio, `dithumb` for pics, `dthumb` to disable all
  * try to detect and adjust for missing ffmpeg features
    * adds `--th-ff-jpg` and `--th-ff-swr` when necessary but it breaks the first few thumbs
* flat theme, selectable in the settings tab
  * new arg `--theme` sets default theme, default 0 = old dark theme
  * new arg `--themes` adds more theme buttons to the UI if you've included your own theme through `--css-browser`

# bugfixes
* more aggressively prevent systemd from deleting the sfx from `/tmp` while copyparty is running
* javascript crash if media player settings were changed without music playing

# other changes
* add `mpc`/musepack to known audio formats (for streaming and spectrogram thumbnails)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0324-0135  `v1.2.3`  the ancient ones

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* browser-client: never give up on a failed upload -- keep retrying every 30sec

# bugfixes
* files with last-modified older than 1980-01-01 didn't make it into zip downloads



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0320-0515  `v1.2.2`  dont crawl me bro

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* options to tell crawlers / search engines you dont wanna be indexed
  * either globally with `--no-robots` or single volumes using volflag `norobots`
  * allow crawlers inside a volume with volflag `robots`
  * or just use [robots.txt](https://www.robotstxt.org/robotstxt.html) like usual ( ´ w `)
* `--force-js` disables plain HTML folder listings, making things harder for crawlers who ignore the hints
  * internet explorer 9 is the oldest surviving browser
* `--html-head` to append additional HTML to the `<head>` section of all pages

# bugfixes
* inaccurate server URLs displayed on startup
  * correct protocol based on port / `--http-only` / `--https-only`
  * Windows: ignore interfaces with no ethernet cable connected
  * Windows: show URLs for all IPs on each interface
  * Linux: show link state next to URLs
* reset console color on exit

# other changes
* show name of open document in page title




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0303-0026  `v1.2.1`  ikke den men denja

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* plaintext volume listings at http://127.0.0.1:3923/?h&ls=v

# bugfixes
* search: support negative queries / subtracting tags from searches
  * you can put stuff like `gura -kagura` in the tags field
  * also the `raw` field supports `and/or/not` for more complex stuff such as
    ```
    ( tags like *nhato* or tags like *taishi* ) and ( not tags like *nhato* or not tags like *taishi* )
    ```
* [prisonparty](https://github.com/9001/copyparty/blob/hovudstraum/bin/prisonparty.sh): clean shutdown when used as a service
* ftp server now runs on python2 as well
  * ftps does not

# other changes
* higher debounce for searches
* slightly more padding in the files table
* added asyncore/asynchat into the sfx to (hopefully) support running the ftp server in python 3.12 when that releases late 2023



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0213-1558  `v1.2.0`  ftp btw

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* ftp server
  * built on [pyftpdlib](https://pypi.org/project/pyftpdlib/)
    * plaintext (`--ftp`), and/or...
    * FTPES / explicit-TLS (`--ftps`)
    * active or passive, as client prefers
  * upload, download, accounts (read / write / move / rename / delete)
  * does NOT have resumable uploads -- delete and reupload as necessary
  * integrated with up2k
    * uploaded files are indexed into the database
    * unpost is available (delete your own recent uploads)
* `--s-wr-slp` now rate-limits file uploads as well, in addition to downloads
* `--srch-hits` sets the max number of search results, defaults to 1000 (same as before)
* ctrl-click `-txt-` links to open the document viewer in a new tab
* log terse checksum of uploaded files

# bugfixes
* file-search: path queries didn't include the volume prefix/mountpoint
* ie11 could throw exceptions on keystrokes

# other changes
* finally deprecated `copyparty-sfx.sh`
* update some dependencies
  * marked `4.0.10` -> `4.0.12` fixes minor table formatting issues
  * easymde `2.15.0` -> `2.16.1`
  * codemirror `5.64.0` -> `5.65.1`

# notes
* the ftp server is not compatible with python 3.12 (releasing october 2023)
  * will be fixed in a [future version of pyftpdlib](https://github.com/giampaolo/pyftpdlib/issues/560)

the sfx was built from https://github.com/9001/copyparty/commit/39e7a7a2



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0118-2128  `v1.1.12`  i should stop adding bugs

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# bugfixes
* fix PUT response in write-only folders (broke in v1.1.11)

# other changes
* [prisonparty](https://github.com/9001/copyparty/blob/hovudstraum/bin/prisonparty.sh):
  * fix examples 
  * support running from source
* [mtag-install-deps](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/install-deps.sh):
  * fix downloading tarballs from github (they stopped returning content-dispositions)
  * build vamp-sdk from source if unavailable
* forgot to mention [partyjournal](https://github.com/9001/copyparty/blob/hovudstraum/bin/partyjournal.py):
  * was a new feature in v1.1.11
  * shows a history of all uploads within a volume by reading the up2k db
  * can replace IPs with nicknames if provided as arguments



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2022-0114-2125  `v1.1.11`  chromecast?

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* include file-url in PUT responses
  * to support the [android app](https://github.com/9001/party-up/)
* main-tabs have links and are linkable which would have been a great help [before the android app existed](https://user-images.githubusercontent.com/241032/147699835-16101690-aab1-49da-a3cc-d16759808af5.jpg)

# new plugins (disabled by default)
* [very-bad-idea.py](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/very-bad-idea.py) and [meadup.js](https://github.com/9001/copyparty/blob/hovudstraum/contrib/plugins/meadup.js) which together turns a raspberry pi into a janky yet extremely flexible chromecast clone
  * anything uploaded through the app (files or links) are executed on the server
  * adds a virtual keyboard by @steinuil to the basic-upload tab
  * dedicated to extremely particular occasions where randomly evaluating code is A-OK
    * sweden-approved software

# bugfixes
* return own external ip as `Host:` if `Host:` is not provided by client
* correct clipboard actions available when jumping between permission levels
* markdown converter accidentally using a broken ie11 shim on all browsers
* changing the sort-order in the file listing didn't affect the thumbnail view

# other changes
* upgrade marked.js to 4.0.10
  * fixes misc rendering bugs




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1216-2305  `v1.1.10`  chill

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# bugfixes
* patiently wait when clients stop consuming data
  * fixes connections going bad when streaming movies or music
  * only affects sendfile, meaning reverse-proxied and non-https connections
* try FFmpeg when mutagen partially fails to parse a file (not just when it throws)

# other changes
* add [multisearch.html](https://github.com/9001/copyparty/blob/hovudstraum/docs/multisearch.html), applying a search template to a list of filenames
  * the currently only example grabs youtube-IDs and finds all related files for that ID



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1210-0144  `v1.1.8`  merry xmas

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* folders are colored blue when using `?ls=v` to list stuff in a terminal
* add folder breadcrumbs inside the textfile navpane

# bugfixes
* folder breadcrumbs (the non-navpane ones) glitching out while viewing textfiles
* give 404 instead of 500 when accessing `/.cpr`

# other changes
* expose some more state from the up2k client to ease debugging
  * for example to find out that firefox94 cannot read files bigger than 2 GiB when compiled with musl
* updated the [alternative fuse client](https://github.com/9001/copyparty/blob/hovudstraum/bin/copyparty-fuseb.py) so it kinda works again
  * still no reason to use that instead of the [main client](https://github.com/9001/copyparty/blob/hovudstraum/bin/copyparty-fuse.py)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1207-1819  `v1.1.7`  two wrongs

[v1.1.5](https://github.com/9001/copyparty/releases/tag/v1.1.5) and [v1.1.6](https://github.com/9001/copyparty/releases/tag/v1.1.6) were pretty busted, sorry bout that
(so much for stable eh)
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# known problems / todo
so far just mild annoyances, nothing bad
* clicking breadcrumbs with the textviewer open will navigate correctly but messes up the breadcrumbs
* server throws an exception when accessing `/.cpr`
* up2k should expose `st` for easier debugging

# bugfixes
* search-results ui
  * selecting / playing audio results broke in v1.1.5
  * and playing audio tracks in search results would clobber the search URL but that has always been a thing
* only show unique IPs in the window-title



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1207-0017  `v1.1.6`  not copyparty

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* option `--doctitle` changes the titles in the web-ui from "copyparty" to something else
* option `--wintitle` sets the console window-title, defaults to the primary/external IP
* volume-flags [`d2ds` and `d2ts`](https://github.com/9001/copyparty#file-indexing) to selectively disable on-boot indexing for some volumes
* support funky linux distros (with no `~/.config` and read-only `/tmp` such as recent Termux builds)

# bugfixes
* last release broke folder listings if you left off the trailing slash in the url
  * also fix the markdown-editor breadcrumbs which made that very obvious
* when running without `-e2d`, don't proactively create symlinks for dupe uploads
  * prevents the client from accidentally pushing superflous links
* ui didn't update correctly when navigating into a folder with indexing disabled

# other changes
* less indentation of outermost lists in the markdown viewer
* update some dependencies
  * marked `3.0.4` -> `4.0.6` fixes a performance regression in huge documents



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1204-0233  `v1.1.5`  certified spa

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* much faster navigation when the navpane is closed (no more full reloads)
* sort-order preference also applies to the initial listing now, #8 
* sort-order indicators in the grid and list views
* symlinks (duplicate uploads) now keep the uploader's timestamps
* panic-button in the control panel to reset all browser settings



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1128-0322  `v1.1.4`  enter the lab

* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* quoted searches, for stuff like "[more more more](https://www.youtube.com/watch?v=bgVRGmOK4SM)"
* upload ETA in the browser window title
* audio-player stays open on navigation
* thumbnails indicating whether clicking an audio file will start playing it (when the audio-player is open) or not
* mtp plugin [image-noexif](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/image-noexif.py) removes EXIF from uploaded images
* when running on windows; disable quickedit so cmd.exe doesn't pause the server if you accidentally click the console window
  * option `--keep-qem` disables disabling it

# bugfixes
* forcing specific compression levels using volume-flag `pk`
* mtp plugins [audio-bpm](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/audio-bpm.py) and [audio-key](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/audio-key.py) couldn't open files with mojibake / corrupt filenames

# other changes
* uploading files by dragging them into the browser using a computer from before 2009 should have zero delay now
* workaround for a chrome bug (appeared in chrome 96, fixed in 98) where dragging a link would activate the uploader
* mention in the readme that enabling the audio equalizer, with all values at zero, makes gapless albums fully gapless
* better error messages in the [standalone up2k upload client](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py)
* mirror at [gitlab](https://gitlab.com/9001/copyparty/-/releases) since github has been down a lot lately



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1120-0127  `v1.1.3`  CoreAudioFormat aight yeah okay

not super important but recommended
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# known problems
* **streaming compression of uploads:** optional arguments to volume-flag `pk` don't work, so you can only force-enable compression without specifying an exact algorithm (gz/xz) and level (0-9), instead letting the client choose a preference -- default is `gz,9`

# new features
* automatically enable transcoding for unsupported audio codecs (aac/m4a in some chromium builds)
* audio-player: gapless albums are even closer to gapless now
  * especially on iOS devices as they generally ignore preload hints
  * on all other browsers, opus appears to perform better than other codecs (noice)
* added a tooltip delay, and a hint next to the mouse-cursor for instant feedback
* new button in the control-panel, `enable k304` which kills the http connection on every `304 Not Modified` response
  * avoids a bug in some browsers (ie11) and webproxies (squid maybe?) which *sometimes* get stuck, expecting data after the header
* enable up2k-registry serialization when running without `-e2d` / sqlite, so incomplete uploads can be resumed after a server restart
* include both the hex and base64 sha512 representations in upload responses
* [standalone up2k upload client](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py): option `--ok` ignores any inaccessible files/folders and starts the upload anyways
* option `--rsp-slp` adds a synthetic delay to client responses

# bugfixes
* up2k-webclient: could crash if two browser-tabs uploaded the same chunk simultaneously
  * mostly harmless but you'd have to reload the tab to fix it + manually resume the upload
* buggy behavior when python was compiled without sqlite3 (default on freebsd)
  * memory usage would grow infinitely as more files were uploaded
  * exceptions sent to the client when trying to search
* add timeouts to FFmpeg operations, preventing invalid files from eating the `--th-mt` threads
  * 10 seconds for filetype / metadata parsing
  * 60 seconds (`--th-convt`) for thumbnails and audio transcoding
* up2k-webclient: fix an inconvenient priority inversion when turbo/yolo was enabled

# other changes
<table><tr><td><a alt="screenshot of an iPod displaying the lockscreen controls for the copyparty audio player" href="https://user-images.githubusercontent.com/241032/142711926-0700be6c-3e31-47b3-9928-53722221f722.png"><img src="https://user-images.githubusercontent.com/241032/142711927-3e554cc3-01d0-4b46-adb1-a3e82a0870ef.png" /></a></td><td>
<p>replaced <code>ogv.js</code> with serverside rewrapping of opus files into the appropriate apple-proprietary container</p>
<ul>
<li>sfx size is now 190 KiB smaller</li>
<li>feature-wise, this <b>only affects iOS devices</b> (iPhones, iPads, iPods)</li>
<li>no more opus decoding in javascript! now uses the native opus decoder instead</li>
<li>enables OS media controls since apple finally added <code>mediaSession</code> in iOS 15
	<ul><li>play/pause doesn't work too well, probably fixed in a future iOS version</li>
	<li>artist/title tags can suddenly become the filename (another iOS bug)</li></ul>
</li>
<li><b>disables</b> the in-browser volume control because <a href="https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW11">apple demands it</a>, can't be helped</li>
<li><b>disables</b> support for <code>ogg/vorbis</code>, only opus is playable without transcoding
	<ul><li>vorbis is transcoded to opus automatically, but this causes a quality loss</li></ul>
</li>
<li>audio-equalizer is broken for opus and all other 48khz audio files because apple made <code>AudioContext</code> hardcoded to 44100 hz
	<ul><li>makes the iPhone X buffer-overflow, all audio dies after ~2 minutes</li>
	<li>also ruins the common workaround for apple disabling volume controls</li></ul>
</li>
<li>gets rid of the silly sinewave generator which tricked iOS into letting the tab continue playing in the background</li>
</ul></td></tr></table>



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1112-2208  `v1.1.2`  mind the gap

* latest important update: **this one**? kind of
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

# new features
* navigate into textfiles using hotkeys (`v, k`)
* close various UI elements by repeatedly hitting the Escape key
* doubleclick files/folders to open them (in the grid view, when multiselect is enabled)
* `--s-wr-slp` sets a delay between socket writes, simulates a slow network during downloads
* `--s-wr-sz` sets socket write size, default 256 KiB (was hardcoded 32 KiB until now)
  * this increase download speed by ~50% (to around 3 GiB/s) when running on windows / where sendfile is unavailable

# bugfixes
* when uploading two files with the same name and size, only the first file got uploaded
  * so now it's also possible to upload the same files you just searched for without the refresh jank
  * discovered thanks to rockylinux serving the same package in multiple pools, nice
* when full-preload is enabled, also do regular preloading so the decoder has a chance to prepare (fixes gapless playback)
  * and kill the preloaders if they don't finish in time so free up network
* additional preloading fixes for ogv.js, only affecting **apple devices** when playing ogg/vorbis/opus audio:
  * disable full-preload since ogv skips the browser cache somehow
  * swap between the ogv instances to preserve cached audio
  * still a bit of silence left between tracks as the decoder boots up but that is the price you have to pay for using proprietary garbage
* `ctrl-a` now only selects the text within the focused codeblock in text documents
* minor correctness fix regarding chunked uploads
* avoid crc32 collisions in filenames
  * affected the media player and file selection, but [was unlikely to happen](https://i.stack.imgur.com/u4DeG.png)

# other changes
* prefer fpool on linux as well, since btrfs and zfs (and probably others) perform better with it



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1108-2139  `v1.1.1`  firefox v92 broke the clipboard

* latest important update: [v1.0.8](https://github.com/9001/copyparty/releases/tag/v1.0.8)
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## upgrade notes
* clipboard protocol changed -- `F5` your browser-tabs before moving any files with `ctrl-x` + `ctrl-v`

# new features
* option to preload the entire next song when approaching end-of-track
  * new button in the audioplayer options panel
  * should help with spotty but fast connections
  * *(probably does more harm than good on slow ones)*

# bugfixes
* [firefox v92 broke clipboard sync](https://bugzilla.mozilla.org/show_bug.cgi?id=1740144), so moving files between browser-tabs didn't work too well

# other changes
* adjusted the fallback spectrogram generator to better match the preferred one




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1106-2227  `v1.1.0`  opus

* latest important update: [v1.0.8](https://github.com/9001/copyparty/releases/tag/v1.0.8)
* latest gzip edition of the sfx: [v1.0.14](https://github.com/9001/copyparty/releases/tag/v1.0.14#:~:text=release-specific%20notes)

## upgrade notes
* you can use `--no-reload`, `--no-acode`, `--no-athumb` to disable the new features described below

# new features
* **audio transcoder**
  * hipster audio formats are transcoded to opus on-demand
    * `aac` `m4a` `flac` `alac` `mp2` `ac3` `dts` `wma` `ra` `wav` `aif` `aiff` `au` `alaw` `ulaw` `mulaw` `amr` `gsm` `ape` `tak` `tta` `wv`
  * because kipu wanted to play his `.au` bangers from 1993
  * needs FFmpeg and FFprobe, can be disabled with `--no-acode`
* **audio spectrograms**
  * are shown as thumbnails for audio files
  * supported formats: same as transcoder + `mp3` `ogg` `opus`
  * needs FFmpeg and FFprobe, can be disabled with `--no-athumb`
* **textfile viewer**
  * with syntax hilighting
    * can be disabled by deleting `web/deps/prism.js.gz` or building the sfx with `no-hl`
  * and list of textfiles in the navpane; toggle with hotkey `v`
* **navpane context dock**
  * snap parent folders into a panel to keep track in huge folders
  * toggle-button to disable it in the navpane toolbar
* **config reload**
  * SIGUSR1 reloads the config files
    * the [systemd example](https://github.com/9001/copyparty/blob/hovudstraum/contrib/systemd/copyparty.service) has been updated with `ExecReload`
  * only does accounts, volumes, and volflags -- so any changes to args still require a full restart
  * also available as a button in the control panel
    * can be disabled with `--no-reload`
* option to specify args (command-line arguments) in the config file
* url parameter `?txt` to return file as utf-8 text
  * or `?txt=iso-8859-1` to set a specific encoding
* url parameter `?mime=text/html;charset=shift_jis` to request a specific response mimetype
* [service script for freebsd](https://github.com/9001/copyparty/blob/hovudstraum/contrib/rc/copyparty), thx @kipukun 

# bugfixes
* [standalone up2k upload client](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) was showing https warnings with `-td`
* trailing newline missing in `?ls=t` and `?ls=v`
* add a bunch of known mimetypes to help ms-windows a bit
* lowercase all content-type charsets (firefox became case-sensitive at some point)
* example for giving multiple users the same permission-set using config files did not actually work

# other changes
* navpane is enabled by default on sufficiently large displays
* audio-player preload increased from 10 to 20 sec, giving the opus transcoder some time
* finally removed the deprecated `-e2s` option after 9 months (replaced by `-e2ds`)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1029-2237  `v1.0.14`  party donuts

* latest important update: [v1.0.8](https://github.com/9001/copyparty/releases/tag/v1.0.8)
* latest gzip edition of the sfx: **this ver!**

## argv changes
* `--th-mt 0` no longer means «*use all CPU cores*», however using all cores is (and was) the default when leaving it unset
* `--re-int` no longer serves a purpose and was removed (it is automatically inferred)
* `--no-mtag-mt` was replaced by `--mtag-mt 1` to allow setting exact core counts

## new features
![copyparty-donut](https://user-images.githubusercontent.com/241032/139513444-c22fc17a-6f44-4308-9cb0-ab191e40660b.png)
* up2k tab (and favicon) become a donut / progress-ring while uploading / searching
  * favicon becomes ETA when less than 99sec remains and ETA is sufficiently stable
* tag scanning is now multithreaded for recent uploads as well, like the initial scan is/was
* url parameter `?ls=t` returns a plaintext directory listing, and `?ls=v` adds terminal colors
* less cpu wakeups! *conserve electricity and be power smart :^)*
* add refresh and logout buttons to the control-panel
* try to catch and warn about some common config mistakes
* when launched without arguments: try to use port 80 and 443 by default on windows (and when running as root)

## bugfixes
* couldn't delete empty folders
* spacebar now triggers the OK/Cancel buttons in modal popups
* navpane didn't have locale-aware sorting like the file listing does
* uploading a blank file would glitch the browser tab until the next page refresh
* the [standalone up2k client](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) tried to mimic rsync behavior for source folder selection but had it the other way around
* if files were deleted while scanning for tags, the file hash was permanently marked as not having tags
* if some endpoints fail to bind, don't print them as "available" during startup
* navpane scroll glitch when loading new folders
* toast-positioning in ie11

## other changes
* truncate file "extensions" longer than 16 characters
* remove the multiprocessing warning on startup since it's mostly confusing
* mention selinux (fedora/centos/rhel-specific) setup steps in the systemd example
* new cheatcode in the javascript repl (bottom-left pi symbol) which turns all file links into download links

## release-specific notes
this release includes two additional sfx builds:
* [copyparty-enterprise.py](https://github.com/9001/copyparty/releases/download/v1.0.14/copyparty-enterprise.py) was built with `./scripts/make-sfx.sh re no-sh no-dd no-ogv`, removing `ogv` (the iOS ogg/opus/vorbis audio decoder) and `dd` (the audio-tray mouse cursor) to save some space
* [copyparty-sfx-gz.py](https://github.com/9001/copyparty/releases/download/v1.0.14/copyparty-sfx-gz.py) was built with `./scripts/make-sfx.sh re no-sh no-dd no-ogv no-cm gz`, also removing `cm` (the codemirror-based markdown editor), but more importantly using gzip compression rather than the usual bzip2, mostly useful for smoketests on feature-reduced python builds and embedded platforms

for future releases, you can use a script to automatically grab the latest sfx and create the two additional builds:
* download and run [copyparty-repack.sh](https://github.com/9001/copyparty/blob/hovudstraum/scripts/copyparty-repack.sh) on either linux, macos, or windows-msys2
* the two additional builds in this release are `sfx-ent/copyparty-sfx.py` and `sfx-lite/copyparty-sfx-gz.py` -- see [sfx-repack](https://github.com/9001/copyparty#sfx-repack) for more info



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1024-1906  `v1.0.13`  css fix

* latest important update: [v1.0.8](https://github.com/9001/copyparty/releases/tag/v1.0.8)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## bugfixes
* currently-playing song didn't hilight correctly



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1024-0112  `v1.0.12`  some polish

* latest important update: [v1.0.8](https://github.com/9001/copyparty/releases/tag/v1.0.8)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## upgrade notes
* [minimal-up2k.html](https://github.com/9001/copyparty/blob/hovudstraum/docs/minimal-up2k.html) has changed slightly, [diff](https://github.com/9001/copyparty/commit/d77ec2200781cc1d381a074831c0bffc749e835d#diff-8b665a140ab1a0dde9b487df3b60ba38718253dddc3c7e3513eec5116ab6c11e)

## new features
* better thumbnail caching
  * 1 week expiration time
  * persist the webp-support test results for faster init
* add `--js-browser` to add custom javascript
* hop into subfolders from the file-list without doing full reloads
  * still does a full reload if navigating up to the parent folder, so use the navpane for that
* support searching on ie9

## bugfixes
* thumbnail toggle didn't take effect until the next navigation
* file indexing when mounting an entire disk on windows

## other changes
* general ux improvements
  * reflow the up2k panel for superwide screens
  * make the "close search results"  button more obvious
  * banner over inlined readme files
* some cleanup of the dark theme
  * visible panels (for the navpane etc)
  * thumbnail alignment

thx to @Bevinsky and @icxes for the ux suggestions



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1018-2310  `v1.0.11`  jeg fant jeg fant

* latest important update: [v1.0.8](https://github.com/9001/copyparty/releases/tag/v1.0.8)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* search results are now shareable URLs
* optionally provide a filename when uploading with PUT or `?raw` POST
  * add a trailing slash to the URL to autogenerate a filename like before
  * and `?raw` POST without content-type is now allowed
* file-listing is refreshed when all up2k uploads complete
* new option `--ign-ebind` to continue startup even if one of the IPs / ports couldn't be listened on
* new option `--ign-ebind-all` to run even if copyparty can't receieve any connections at all
  * maybe useful for monitoring folders and hashing new files on a timer or something

## bugfixes
* unpost in jumpvols (inside `/foo/bar/` if `/foo/` and `/foo/bar/qux/` are volumes)
* u2cli: aggressive flushing to show uploaded files in realtime

## other changes
* replaced the "press button to play music" splashpage with a regular modal
* replace `:` with `.` in filenames from ipv6 clients
* volume listing on the frontpage is sorted alphabetically




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1011-2343  `v1.0.10`  favicon

* latest important update: [v1.0.8](https://github.com/9001/copyparty/releases/tag/v1.0.8)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## breaking changes
* the argument `--no-hash` and volume-flags `dhash`, `ehash` (booleans) have been replaced with regex patterns; continue reading below

## new features
* optional favicon! configurable client-side in the `[⚙️]` config tab
  * the selected favicon is remembered per-server (good for keeping track of tabs)
* new argument `--no-idx '\.iso$'`, also available as volume-flag `[...]:c,noidx=\.iso$`
  * every filepath matching the given regex (`iso$`) will be ignored/skipped during indexing
  * uses OS-defined separators, so use `\\` as path-separator on windows
* "new" argument `--no-hash foo` and volume-flag `[...]:c,nohash=foo`
  * like `--no-idx`, but it only skips the file-contents indexing, so filename/path/size is still searchable
  * this replaces the boolean `--no-hash` and volume-flags `dhash`, `ehash`

## bugfixes
* fix ui race-condition (mkdir with navpane closed)
* mkdir was broken on python 2.7 since [v0.12.1 (july 28)](https://github.com/9001/copyparty/releases/tag/v0.12.1)
* try to support some buggy python builds (invalid ffi symbols)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1009-2029  `v1.0.9`  cirno reference

* latest important update: [v1.0.8](https://github.com/9001/copyparty/releases/tag/v1.0.8)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* readme: [run a program when a file is uploaded](https://github.com/9001/copyparty#upload-events)
  * add `-mtp` support for non-python programs
* better performance in the `-e2ds` filesystem indexer, particularly for samba/nfs shares
* support clients with read-only `localStorage` (private-browsing on certain iOS versions according to MDN)

## bugfixes
* a case of symlink-loops not being detected during `-e2ds` filesystem indexing
* #4 fixes incorrect protocol in the basic-upload response, thx Daedren
* flickering when refreshing the browser in lightmode
* sfx-repack: fix `no-dd` also disabling the loader animation by producing a bit of css with invalid syntax

## other news
* the [standalone up2k upload client](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) can detect and skip existing files much faster than the regular web client if you give it `-z`
  * (not part of this release, grab it from the link)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-1004-2050  `v1.0.8`  1.0.8 sketches

* latest important update: **this ver** (if you have non-https users)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* [portable / standalone up2k upload client](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py) now included in the pypi package, [readme](https://github.com/9001/copyparty/tree/hovudstraum/bin#up2kpy) / [webm](https://ocv.me/stuff/u2cli.webm)
* empty / zero-byte files can now be uploaded
* up to 20 results are listed for filesearches, rather than just 1
* audio player progressbar now has textlabels next to the minute markers
* new argument `--vague-403` makes copyparty reply with 404 (not found) when it's actually a 403 (permission denied), which was the entirely-too-confusing default behavior for versions `1.0.3` through `1.0.7`
* new mtp plugin [cksum.py](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/cksum.py) generates various checksums

## bugfixes
* race-condition initializing the up2k-client when dropping files into the browser and you're not using https
* hilight active folder in the navpane even when the browser and copyparty disagrees on how to urlencode
* hide prologue/epilogue while search results are open
* toasts could redefine css

## other changes
* better focus outlines
* less verbose debug toasts
* dropzones more obvious at a glance / in a rush



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0926-1815  `v1.0.7`  pool party

* latest important update: [v1.0.3](https://github.com/9001/copyparty/releases/tag/v1.0.3)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* [portable / standalone up2k upload client](https://github.com/9001/copyparty/blob/hovudstraum/bin/up2k.py): early beta, apparently faster than browsers, [readme](https://github.com/9001/copyparty/tree/hovudstraum/bin#up2kpy) / [webm](https://ocv.me/stuff/u2cli.webm)
* up2k: fully parallelized handshakes and uploads
  * uploading smol files is way faster now
  * some files may temporarily display as "failed" until all uploads complete
* browser: `mkdir` and `msg` can be used during uploads (no longer does a full page reload)
* up2k: option to keep destination files open during uploads (fd pool)
  * on windows: default-ON, due to Microsoft Defender "real-time protection" being hella expensive
  * on linux/macos: default-OFF, but can be enabled with `--use-fpool` for things like nfs
* up2k: new option `--no-symlink` to fully dupe files instead of adding symlinks
* add minimal support for some more eccentric browsers (including Hv3)

## bugfixes
* up2k: check all dupes for a matching filesystem path
  * prevents duplicate symlinks if the same dupe is repeatedly uploaded to the same place
* don't crash the tag collector thread if there are invalid tags
* up2k-client: don't DDoS the server if the http response is invalid
* when running without `-e2d`, recently uploaded files could not be deleted
* on windows, absolute filesystem-paths could appear in exceptions sent to the client
* misc url escaping fixes, mostly regarding files/folders where name contains `?`
* sort-order being reset if you visit an empty folder

## other changes
* moved the up2k fence-toggle into the settings pane since probably nobody uses it
* readme: add a section on recovering from [client crashes](https://github.com/9001/copyparty#client-crashes)
  * firefox (the whole browser and all its tabs) can crash during upload




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0919-1311  `v1.0.5`  one more

* latest important update: [v1.0.3](https://github.com/9001/copyparty/releases/tag/v1.0.3)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## bugfixes
* basic-upload into `fk` (accesskey-enabled) folders
  * affected sharex, scripts, old browsers
  * files were uploaded correctly but the reply from copyparty was garbage



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0918-2241  `v1.0.4`  early bird gets the bugs

* latest important update: [v1.0.3](https://github.com/9001/copyparty/releases/tag/v1.0.3)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## bugfixes
* folders and volumes being out-of-order in the initial listing
* it was possible to shrink the navpane so much that the shrink/grow buttons disappeared
* a bunch of features stopped working in folders where `fk` (per-file accesskeys) was enabled

## other changes
* increased cache timeout for static resources
* can no longer open the markdown editor without write-access
* the argument parser can handle multiple volume flags in one group now, so `c,e2ds,dupe` instead of `c,e2ds:c,dupe`




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0918-1550  `v1.0.3`  unlisted

* latest important update: **this one**
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## known bugs
* on phones, it is *possible* to make the navpane so small that the resize buttons disappear
  * happens if you navigate into a folder 7+ levels deep, reduce the navpane size so the `a` button is barely visible, then disable `a`
  * **fix:** open the js prompt (click the bottom-left `π`) then execute `,.` (comma dot) and click `reset settings`

## new features
* new permission `g`: read-access only if you know the full URL to a file; folder contents are hidden, cannot download zip/tar
* new volume flag `fk`: generate per-file accesskeys, which are then required by `g` users to access files, making it harder to bruteforce URLs
  * users with full read-access can see the accesskeys appended to the URLs when browsing folders
* [wget.py](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/wget.py): download files to the copyparty server by POSTing file URLs in the web-UI
* show a login prompt on 404/403 pages
* option to disable wordwrap in the navpane

## bugfixes
* loss of access to anon-read/write folders after logging in
  * affected filesearch, regular searching, and volume listings
* more aggressively `no-cache`, preventing cloudflare from eating api calls
* after deleteing all files inside a folder, don't delete the folder itself
  * was intended behavior but fairly confusing
* don't reshow tooltips when alt-tabbing
* accessibility: always hilight focused things
* markdown-editor modification poller doesn't cause performance issues after having a document open for several months
* mtp plugins [audio-bpm.py](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/audio-bpm.py) and [audio-key.py](https://github.com/9001/copyparty/blob/hovudstraum/bin/mtag/audio-key.py) explicitly asks for just the first audio stream, which prevents ffmpeg from transcoding video (nice)

## other changes
* updated some web-deps
  * marked: `v1.1.0` -> `v3.0.4` (with modifications)
  * easymde: `v2.14.0` -> `v2.15.0` (with modifications)
  * codemirror: `v5.59.3` -> `v5.62.3` (with modifications)
  * hashwasm: `v4.7.0` -> `v4.9.0`
* easymde uses the external `marked.js` to save some space
* README.md has the same maxwidth as in the viewer/editor
* show a toast if there's an unhandled promise reject
* markdown-editor shows the current line number
* cfssl.sh (certificate generator) asks for fqdn instead of inventing something
* sfx binaries try to use python3 explicitly since a lot of distros don't have a /usr/bin/python at all




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0909-0721  `v1.0.2`  it is still 9/9

blessed by the strongest, *this will surely be the final version*
* latest important update: [v1.0.1](https://github.com/9001/copyparty/releases/tag/v1.0.1)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## bugfixes
* audio equalizer (broke in v1.0.1)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0908-2259  `v1.0.1`  happy 9/9

blessed by the strongest, this will surely be the final version
* latest important update: **this one**
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* click an open tab to close it (thx daniiooo)

## bugfixes
* multipart POSTs could get incorrectly rejected with `protocol error after field value`
  * had a `0.14%` chance of happening (worst-case; 1400 mtu, 2 offsets)
  * affected stuff like saving markdown documents, renaming files, ...
  * did **not** affect file uploads, and reverseproxy probably helped prevent it
* filedrop UI could let you try to upload/search without the necessary permissions
  * purely cosmetic, would immediately fail with a slightly cryptic error message
* apply a different equalizer tuning for some browsers
  * some permutations of chrome and win10, and also some phones, have incorrect Q scaling at higher frequencies, causing treble to be massively boosted
  * now tries to detect this by sampling the frequency response at 15khz and setting different gains (less dangerous than touching Q)

## other changes
* search ui does not initiate searches as eagerly if the textbox has a very short value
  * helps prevent overloading slow browsers with accidental wildcard searches




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0907-2118  `v1.0.0`  sufficient

we did it reddit 👉😎👉
* latest important update: [v0.13.5](https://github.com/9001/copyparty/releases/tag/v0.13.5)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## known bugs (all harmless)
* the website may let you attempt to upload stuff without write-access
  * fails gracefully with an error-message so it's all good

## new features
* separate dropzones for uploading and searching! no more confusing modeswitching
  * and the dropzone is global, so just drop files into the browser to upload / search 🚀🚀🚀
* add 10-minute indicators to the audio player seekbar
* make-sfx: argument `fast` reduces compression level

![2021-0908-010348-firefox-fs8](https://user-images.githubusercontent.com/241032/132421531-efdc1165-785b-422d-bb5f-8b551c335c39.png)

## bugfixes
* moving/deleting files when running without `-e2d` (thx ixces)
* zip/tar downloads: single folders are now the root element of the archive (not their contents)
  * not really a bug but sufficiently unexpected
* tiny lightmode fix + minor errormessage cleanups

## other changes
* crashpage: replace irc handle with new-github-issue link (i'm `+G` anyways heh)
* meta/github stuff
  * renamed `master` branch to `hovudstraum` ("primary river" in nynorsk)
  * add [CONTRIBUTING](https://github.com/9001/copyparty/blob/hovudstraum/CONTRIBUTING.md), [code of conduct](https://github.com/9001/copyparty/blob/hovudstraum/CODE_OF_CONDUCT.md), and [issue templates](https://github.com/9001/copyparty/tree/hovudstraum/.github/ISSUE_TEMPLATE)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0905-2306  `v0.13.14`  inline readme.md

* latest important update: [v0.13.5](https://github.com/9001/copyparty/releases/tag/v0.13.5)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* `README.md` is shown below the directory listing
  * can be disabled with `--no-readme`
* new option `--no-logues` disables prologue/epilogues in directory listings
* new option `--no-dot-mv` disallows moving dotfiles (or folders containing them)
* new option `--no-dot-ren` disallows renaming dotfiles (or making something a dotfile)

## bugfixes
* fix upload ETA if there is some idle time between batches
* upload/filesearch with turbo enabled should be even faster now
* markdown-editor scroll desync if document contains offsite images
* better fix for the upload status list pushing the rest of the page around

## other changes
* sfx repacks with `no-fnt` will use `Consolas` instead which does not look terrible on windows




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0903-1921  `v0.13.13`  basic-auth

* latest important update: [v0.13.5](https://github.com/9001/copyparty/releases/tag/v0.13.5)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

note: `copyparty-sfx.py` is https://github.com/9001/copyparty/commit/5955940b which fixes upload eta

## new features
* provide password using basic-authentication
  * useful for clients which don't support cookies or appending queries to the URL
  * order of precedence: `?pw=foo query` > `cppwd cookie` > `basic-auth`
* show OK/Cancel buttons in OS-defined order
  * Windows does OK/Cancel, everything else is Cancel/OK
* crashpage: include recent console messages
* js-repl: command history / presets

## bugfixes
* "fix" the file-list jumping around during uploads
  * ...by adding a massive padding to the uploads list
* make-sfx: set correct version-info on repack
* make-sfx: fix no-dd css modifier

## other changes
* move column-hider buttons above the header so they're not as easy to hit by accident
* jpeg thumbnails are slightly smaller




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0901-2148  `v0.13.12`  september

* latest important update: [v0.13.5](https://github.com/9001/copyparty/releases/tag/v0.13.5)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* show useragent on the crashpage (plus some ui cleanup)

## bugfixes
* thumbnail-zoom hotkeys
* add vertical scrollbar to toasts if necessary
* cut/paste of more than roughly 30'000 files at once

## other changes
* replaced the video icon with a play button in the [browser-icons.css](https://github.com/9001/copyparty/tree/master/docs#example-browser-css) example:

![2021-0902-002101-firefox-fs8](https://user-images.githubusercontent.com/241032/131753177-6741d2af-6220-4f42-aaef-8439171cc0be.png)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0830-2032  `v0.13.11`  selective listening

* latest important update: [v0.13.5](https://github.com/9001/copyparty/releases/tag/v0.13.5)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## bugfixes
* bind specific interfaces which are not `127.0.0.1`

## other changes
* sfx should be a tiny bit smaller



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0830-0102  `v0.13.10`  The Net reference

* latest important update: [v0.13.5](https://github.com/9001/copyparty/releases/tag/v0.13.5)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* click the bottom-left `π` for a js eval prompt
  * good for debugging on phones (and a nice meme)

## bugfixes
* file uploads now happen in alphabetical order
* the default text is selected in prompts (text-input messageboxes)
* crash-page was slightly out-of-bounds on phones
* cheap performance fix when renaming >500 files
* minor ux fixes for old browsers / iOS ~10

## other changes
* return to volume listing after logging in
* fully drop support for playing ogg/vorbis/opus on iOS older than 14
  * final version where this *somewhat* worked was [v0.13.9](https://github.com/9001/copyparty/releases/tag/v0.13.9)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0829-0024  `v0.13.9`  the iOS update

* latest important update: [v0.13.5](https://github.com/9001/copyparty/releases/tag/v0.13.5)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* iOS: play ogg/vorbis/opus files in the background and when the screen is off
  * but please don't touch the lockscreen play/pause button unless `os-ctl` is enabled in the `🎺 media player options` tab
    * safari 15 is rumored to support `MediaSession` so it should *magically work* when that is out

## bugfixes
* iOS: browsers no longer randomly crash when playing an ogg file

## other changes
* tray drawer is a bit smaller (the bottom right burger thing)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0828-0255  `v0.13.7`  dot-dot-dot

(throw more dots, more dots)

* latest important update: [v0.13.5](https://github.com/9001/copyparty/releases/tag/v0.13.5)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* grid-view: filenames longer than 3 lines are truncated with `...`
  * the full filename appears as a tooltip on hover
  * use the `chop` buttons to adjust the limit

## bugfixes
* the 300 msec delay when tapping just about *anything* on phones
  * iphones got slightly better too (still needs the tooltip workaround)
* center tooltips horizontally + close on scroll + fix vertical margin

## other changes
* folder icons are now displayed top-left on thumbnails since it crashed with the ellipsis stuff
  * which also simplifies the [browser-icons.css](https://github.com/9001/copyparty/blob/master/docs/browser-icons.css) example



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0826-2209  `v0.13.6`  the final countdown

* latest important update: [v0.13.5](https://github.com/9001/copyparty/releases/tag/v0.13.5)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* total ETA until all the queued upload/searches are finished
* shows a toast notification with a summary after all uploads finish
* colored status indication for uploads/searches
* shows a warning if uploads/searches are blocked by the up2k flag/mutex
* replaced most monospace text with SourceCodePro
  * looks SO MUCH BETTER on windows

![nu_2-fs8](https://user-images.githubusercontent.com/241032/131047767-8844c829-d336-438e-b7db-c28f084c3397.png)

## bugfixes
* lock navigation focus inside popup messages, we proper modals now
* hashing didn't pause when `parallel uploads` was 0 (arguably a bug)
* navpane could scroll horizontally
* toggling file-search in the middle of an upload queue would affect the remainder of the queue
  * now the files are tagged with search/upload labels as they're added which makes much more sense
* top-level folder thumbnails could 404
* fix up2k-turbo for markdown documents
* fix files skipping the busy-list entirely with turbo enabled
* more predictable(?) file-search behavior when turbo is enabled
* the up2k flag/mutex could get stuck in limbo between two browser tabs if disabled while that tab holds it
* add missing hotkey hint (thumbnail toggle, bottom right)
* minor rice and html-escape fixes for modals and toasts
* avoid android-firefox bug where `number.toFixed(1)` returns `10.00` instead of `10.0` for certain values of 10




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0816-0640  `v0.13.5`  time-travelers friend

* latest important update: **this version**
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* button to scroll navpane to the open folder
  * also automatically does this on page load

## bugfixes
* unpost only worked for the `/` volume
* up2k-client could break on interesting folder-names
* moving more than 100 files at once across browser tabs
* basic-upload into folders with upload rules didn't really work
* ui indicated that renaming multiple files was impossible (but you still could tho)

## other changes
* tiny js optimizations
* even more ancient browsers (including opera 11, hipp hipp) can now use the thumbnail-view and image viewer




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0814-2046  `v0.13.3`  this side up

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* image-viewer: rotate images and videos (hotkeys `R` and `shift-R`)
* video-thumbnails: apply rotation hints from container
* image-thumbnails: apply rotation hints from exif
* image-thumbnails: higher quality AND slightly smaller
  * fix loss of detail on resize
* argument `--th-mt` specifices number of cores to use for thumbnailing
  * default is 0 which means all cores

## bugfixes
* image-viewer: fix pinch-zoom (broke in 0.11.19)
  * on the bright side: zoom is now less buggy than ever

## other changes
* (probably extremely minor) performance tweaks in the image-viewer




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0812-2042  `v0.13.2`  jet engine removal

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* toggle file-selection in the image viewer with hotkey `s` or using the `sel` button

## bugfixes
* chrome would max a cpu core (and consume even more ram than usual) after sitting idle in the browser for a few weeks due to recursive setTimeouts
  * just the `setTimeout` call itself took like 67 msec seriously
  * (firefox was completely fine)
* button placement in huge modals
* play videos in the gallery when clicked
* cut/paste files on ancient chrome versions




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0809-2028  `v0.13.1`  ephemeral

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* ephemeral uploads - set the volume flag `:c,lifetime=600` to delete files 10 minutes after upload
  * feature can be disabled with `--no-lifetime`
* volume flag `:c,rescan=60` to rescan a volume for new/modified files every 60 seconds 
  * same as the old `--re-maxage` except per-volume
* [prisonparty.sh](https://github.com/9001/copyparty/blob/master/bin/prisonparty.sh) - run copyparty in a chroot if you don't trust the volumes

## bugfixes
* handle more exceptions
* dont crash on startup if `XDG_CONFIG_HOME` is invalid
* up2k-ui: toggle button to continue hashing while uploading did nothing
* replace filesystem paths with vfs paths in exceptions returned to the user
* sfx.py: return 1 on exceptions




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0808-0214  `v0.13.0`  future-proof

* **latest stable release:** [v0.12.12](https://github.com/9001/copyparty/releases/tag/v0.12.12)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)

## new features
* reinvented `alert`/`confirm`/`prompt` because [google/whatwg is getting rid of them](https://github.com/whatwg/html/issues/6897#issuecomment-885773622)
* upload quotas (num.files, total bytes) and rotation, see [readme#upload-rules](https://github.com/9001/copyparty#upload-rules)
* streaming compression of uploads to gz or xz, see [readme#compress-uploads](https://github.com/9001/copyparty#compress-uploads)
  * not compatible with up2k and breaks file checksums (dupe-detection, file-search)
* another mtp example ([youtube manifest parser](https://github.com/9001/copyparty/blob/master/bin/mtag/yt-ipr.py))

## bugfixes
none! just new bugs this time

## other changes
* more accurate advice from the up2k searchmode explainer
* warning prompt if you try to open a massive transfer log in the up2k ui
* additional --help sections and early vt100 stripper
* chrome performance fixes in file selection




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0806-0910  `v0.12.12`  lock your doors

[terribly stable](https://www.youtube.com/watch?v=FAVR-FnWGjo)
* if upgrading from v0.11.x or before, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## bugfixes
* forgot a mutex on renames/moves
* file metadata could persist after delete
* relative moves of relative symlinks could break/unlink



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0805-2253  `v0.12.11`  batch-rename

"stable"
* if upgrading from v0.11.x, see [v0.12.4](https://github.com/9001/copyparty/releases/tag/v0.12.4)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## known bugs
* mtp indexing can halt if files are renamed/moved in the middle of a rebuild
  * restart copyparty and it'll resume just fine

## new features
* batch-rename! inspired by foobar2000
  * rename multiple files based on regex and/or media tags
* [`media-hash.py`](https://github.com/9001/copyparty/tree/master/bin/mtag), new mtp module
  * generates `vhash` and `ahash` -- video and audio checksums which can help in spotting dupes
  * usage: `-mtp ahash,vhash=f,media-hash.py` or per-volume `:c,mtp=ahash,vhash=f,media-hash.py`

![batch-rename-fs8](https://user-images.githubusercontent.com/241032/128434204-eb136680-3c07-4ec7-92e0-ae86af20c241.png)

## bugfixes
* renaming single symlinks
* upgrading v0.11 volume arguments on windows
* thumbnails of files with multiple video tracks (theoretically)
* race in the httpd threadpool which could cause a tiny performance drop
* sfx-repack with `no-fnt` / `no-dd`
* funky padding in some browsers




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0801-2249  `v0.12.10`  mth

* **latest stable release:** [v0.11.47](https://github.com/9001/copyparty/releases/tag/v0.11.47) (v0.12.x is almost there)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to v0.11.47 or this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* `-mth`: list of tags to hide by default in the browser

## bugfixes
* better codec detection when using mutagen for tag parsing



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0731-2240  `v0.12.9`  ah yes lightmode

* **latest stable release:** [v0.11.47](https://github.com/9001/copyparty/releases/tag/v0.11.47) (v0.12.x is almost there)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to v0.11.47 or this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## bugfixes
* lightmode rename ui



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0731-2217  `v0.12.8`  better rename ui

* **latest stable release:** [v0.11.47](https://github.com/9001/copyparty/releases/tag/v0.11.47) (v0.12.x is almost there)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to v0.11.47 or this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* better rename ui



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0731-1121  `v0.12.7`  preserve tags

* **latest stable release:** [v0.11.47](https://github.com/9001/copyparty/releases/tag/v0.11.47) (v0.12.x is almost there)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to v0.11.47 or this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## bugfixes
* loss of tags when renaming / moving files within a volume, and when deleting dupes
  * restart copyparty (or rescan in the admin panel) to fix the missing tags




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0731-1038  `v0.12.6`  it keeps happening

* **latest stable release:** [v0.11.47](https://github.com/9001/copyparty/releases/tag/v0.11.47) (v0.12.x is almost there)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to v0.11.47 or this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* toggle-button to show dotfiles (hidden files)

## bugfixes
* renaming files which contain url-escaped characters
* access display (top-right) didn't include move permissions
* thumbnails aren't thumbnailed

## other changes
* move toasts bottom-right (next to the edit buttons) due to phones
* make-sfx is faster and better



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0730-1728  `v0.12.5`  rfc3986 2nd season

this release was made from all-natural, free-range code [PXL_20210730_160240244.jpg](https://ocv.me/i/PXL_20210730_160240244.jpg) (☞ﾟ∀ﾟ)☞ [PXL_20210730_174219083.jpg](https://ocv.me/i/PXL_20210730_174219083.jpg)

* **latest stable release:** [v0.11.47](https://github.com/9001/copyparty/releases/tag/v0.11.47) (v0.12.x is almost there)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to v0.11.47 or this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## upgrade notes
nothing new since v0.12.3 -- short summary of [v0.12.3](https://github.com/9001/copyparty/releases/tag/v0.12.3) and [v0.12.1](https://github.com/9001/copyparty/releases/tag/v0.12.1):
* `--no-mv` disables file/folder move ops
* `--no-del` disables file/folder delete and unpost
* `--unpost 0` disables unpost
* databases upgrade to v5; incompatible with v0.12.1 and older

## bugfixes
* multiselect zip download (broke in v0.12.1)
* filenames of multiselect zip downloads when first item contains " or % (was always broken)
* renaming files inside folders with url-escaped characters



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0730-0652  `v0.12.4`  fix permission groups

* **latest stable release:** [v0.11.47](https://github.com/9001/copyparty/releases/tag/v0.11.47) (v0.12.x is almost there)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to v0.11.47 or this version)
* latest gzip edition of the sfx: [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## upgrade notes
short summary of [v0.12.3](https://github.com/9001/copyparty/releases/tag/v0.12.3) and [v0.12.1](https://github.com/9001/copyparty/releases/tag/v0.12.1):
* `--no-mv` disables file/folder move ops
* `--no-del` disables file/folder delete and unpost
* `--unpost 0` disables just unpost
* databases upgrade to v5; incompatible with v0.12.1 and older

## bugfixes
* fix listing multiple users for the same permission-set
  * `-v .::rw,u1,u2,u3` now works, the workaround was `-v .::rw,u1:rw,u2:rw,u3`



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0729-2232  `v0.12.3`  unpost

1001GET (;_;)
* **latest stable release:** [v0.11.47](https://github.com/9001/copyparty/releases/tag/v0.11.47)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to v0.11.47 or this version)
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

see [v0.12.1](https://github.com/9001/copyparty/releases/tag/v0.12.1) upgrade-notes regarding new opt-out features

## upgrade notes
* new argument `--unpost 0` (and/or `--no-del`) disables the new unpost feature
* your up2k databases will upgrade from v4 to v5; backups are made automatically
  * v5 DBs require copyparty v0.12.3 or newer, so use the backups for older versions

## new features
* unpost! uploaders can delete their uploads within `--unpost` seconds (default is 12 hours)
  * can be disabled by setting `--unpost 0` or with `--no-del`

## bugfixes
* deleting single files (metadata could persist in db)
* `--ls` broke in v0.12.1
* toasts with `<pre>` tags had massive margins
* hopefully fix a bug where malicious POSTs through an nginx reverse-proxy could put the connection in a bad state, causing the next legit request to fail with bad headers

## other changes
* uploader-ip and upload-time is stored in the database
  * but only viewable through an sqlite3 shell;
    `sqlite3 .hist/up2k.db 'select ip, rd, fn from up where ip'`




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0727-2355  `v0.12.1`  filed

```
 <&ed> copyparty became a file manager, trying to think of a release name
 <&ed> "far out", pun on far manager, there we go
<+des> ed: filed
<+des> fil-ed
```

* **latest stable release:** [v0.11.47](https://github.com/9001/copyparty/releases/tag/v0.11.47)
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to v0.11.47 or this version)
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## upgrade notes
* permission `a` no longer exists; is automatically translated to `r` + `w`
* new argument `--no-del` disables all delete operations
* new argument `--no-mv` disables all move/rename operations
* new argument `--no-voldump` disables the volume/permission summary on startup

## new features
* file manager! cut/paste, rename, delete files
  * new permission `m` (move) allows renaming files in (and moving files *out of*) that volume
  * new permission `d` (delete) allows deleting things in that volume
  * hotkeys `ctrl-X`, `ctrl-V` to cut/paste, `F2` to rename, `ctrl-K` to delete
  * tags follow the files when moved; thumbnails just regenerate
* select files/folders in the browser using the keyboard
  * click a file row and use cursor-keys to navigate
  * ctrl-cursor to also scroll the viewport
  * shift-cursors to expand selection
  * spacebar and `ctrl-A` toggles selection
* periodic volume rescan
  * detect and index files coming into volumes from the outside (sftp, rsync, ...)
  * will probably get an inotify alternative at some point but this is more reliable
* list all volumes and permissions on startup
* print server IPs on macos and windows too

## bugfixes
* tags are displayed for symlinked/dupe files
* mkdir defaults to 755, used to be the python-default 777, sorry
* ensure that the multiprocessing workers start correctly (and crash otherwise)
* more reliable db backups on upgrade, using the native sqlite3 backup feature
* signal handler; macos could get stuck on shutdown
* other minor stuff
  * centos7 support fixes
  * missing mojibake support (centralized most of it)
  * better support for buggy windows smb drives
  * edgecases with relative symlinks

## other changes
* replaced the md-editor toasts with the new general-purpose ones




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0722-0809  `v0.11.47`  On Error Resume Next

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* recent maybe-important updates:
  * [v0.11.45](https://github.com/9001/copyparty/releases/tag/v0.11.45) if clients use up2k over plaintext http
  * [v0.11.43](https://github.com/9001/copyparty/releases/tag/v0.11.43) fixes stability in the uploader client
  * [v0.11.41](https://github.com/9001/copyparty/releases/tag/v0.11.41) if running as a service with `-lo`
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* crashpage: add option to ignore exceptions and continue
  * but please do report them so they can be fixed properly w



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0722-0642  `v0.11.46`  chrome friendly

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* recent maybe-important updates:
  * [v0.11.45](https://github.com/9001/copyparty/releases/tag/v0.11.45) if clients use up2k over plaintext http
  * [v0.11.43](https://github.com/9001/copyparty/releases/tag/v0.11.43) fixes stability in the uploader client
  * [v0.11.41](https://github.com/9001/copyparty/releases/tag/v0.11.41) if running as a service with `-lo`
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## bugfixes
* ignored `ResizeObserver loop limit exceeded` in the exception handler
  * chrome [randomly throws this](https://bugs.chromium.org/p/chromium/issues/detail?id=809574) from the `<video>` UI, nice
* logout link could 404



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0720-2123  `v0.11.45`  user friendly

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* recent maybe-important updates:
  * [v0.11.45](https://github.com/9001/copyparty/releases/tag/v0.11.45) (this ver) if clients use up2k over plaintext http
  * [v0.11.43](https://github.com/9001/copyparty/releases/tag/v0.11.43) fixes stability in the uploader client
  * [v0.11.41](https://github.com/9001/copyparty/releases/tag/v0.11.41) if running as a service with `-lo`
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* login/logout link in the top-right corner
  * also shows account name + current access level (per-folder)

## bugfixes
* avoid loading the wasm hasher multiple times
  * it would reload every time the up2k tab was selected, probably dangerous
  * only affects clients using up2k with plaintext http (not https)
* tooltips on iphones, again

## other changes
* crashpage now includes localstore contents
* the up2k filesearch "explain" link now mentions lack of write permissions, if that is the case



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0719-2303  `v0.11.44`  smol fix

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* recent maybe-important updates:
  * [v0.11.43](https://github.com/9001/copyparty/releases/tag/v0.11.43) fixes stability in the uploader client
  * [v0.11.41](https://github.com/9001/copyparty/releases/tag/v0.11.41) if running as a service with `-lo`
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## bugfixes
* browser crash if the audio player runs into the next folder while the folder sidebar is closed (introduced in 0.11.42)

## other changes
* make-sfx.sh: `no-fnt` and `no-dd` shaves another ~10kB



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0718-2356  `v0.11.43`  ux is my passion

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* recent maybe-important updates:
  * [v0.11.43](https://github.com/9001/copyparty/releases/tag/v0.11.43) (this ver) fixes stability in the uploader client
  * [v0.11.41](https://github.com/9001/copyparty/releases/tag/v0.11.41) if running as a service with `-lo`
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* explain the up2k modeswitch in filesearch results

## bugfixes
* up2k-ui coherence check was a bit too picky



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0718-2122  `v0.11.42`  in case of tags

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* recent maybe-important updates:
  * [v0.11.42](https://github.com/9001/copyparty/releases/tag/v0.11.42) (this ver) if you have `-mtp` parsers *and* use Mutagen to read tags
  * [v0.11.41](https://github.com/9001/copyparty/releases/tag/v0.11.41) if running as a service with `-lo`
  * [v0.11.33](https://github.com/9001/copyparty/releases/tag/v0.11.33) fixes stability in the uploader client
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* if Mutagen fails to read a file, it retries with FFprobe
* `--no-mtag-ff` bans all use of FFprobe to read tags
* hotkeys `i/k` now ensure the active folder stays in-view

## bugfixes
* tag search was case-sensitive in some cases (most importantly `key>=1a` did not work as intended)
* advanced-search would break if search terms were double-space separated
* the preferred key-notation did not apply to search results (did rekobo-alnum instead)
* tooltips for column headers didn't work for newly-hidden columns
* no more surprise tooltips when switching tabs

all these changelogs are sorted by importance btw so here's the least important bugfix (since it doesn't affect anyone i know)
* codec/format info was not collected from Mutagen when scanning audio files
  * this broke `mtp` (external metadata parsers)
  * you avoided this issue by not having Mutagen installed, and/or by using `--no-mutagen`
  * if you *were* using Mutagen to collect tags, you can do a single run with `-e2tsr` for a full rescan if you care




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0717-1553  `v0.11.41`  caas

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* recent maybe-important updates:
  * [v0.11.41](https://github.com/9001/copyparty/releases/tag/v0.11.41) (this ver) if running as a service with `-lo`
  * [v0.11.33](https://github.com/9001/copyparty/releases/tag/v0.11.33) fixes stability in the uploader client
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* add shortcut to toggle list/grid-view in the audio drawer
* combine the mkdir/newdoc/msg tabs on narrow screens
* sd-notify support to properly use copyparty as a systemd service
  * other units which `After=copyparty` will be delayed until copyparty is ready to accept connections
  * updated the [unit example](https://github.com/9001/copyparty/blob/master/contrib/systemd/copyparty.service) with the changes (`Type=notify` and `SyslogIdentifier=copyparty`)
* markdown editor hotkeys now work properly on dvorak keyboards
  * the hotkeys use the qwerty layout which seems to be preferred according to stackoverflow

## bugfixes
* clean shutdown on SIGINT and SIGTERM
  * previously, when running as a sysv/systemd service, a `service stop` would lose:
    * lots of log messages when using `-lo`
    * information about incomplete uploads for the past 30 seconds

## other changes
* lots of new tooltips with hotkeys info
  * also explains the cryptic codec/bitrate columns
  * and iphones can now hide tooltips by tapping them since safari is safari
* increased up2k snapshot interval from 30sec to 5min now that SIGTERM is a clean shutdown
* finally found something the `zip_crc` mode is good for: supporting PKZIP v2.04g from october 1993 (absolutely worth)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0714-2313  `v0.11.40`  video player tweaks

(commit #900, checkem)

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) (but skip right to this version)
* recent maybe-important updates:
  * [v0.11.33](https://github.com/9001/copyparty/releases/tag/v0.11.33) fixes stability in the uploader client
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* see steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) if upgrading from something before that
* see steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* allow ctrl-clicking the main tabs to open other views in new tabs
* gallery (the image viewer / video player, accessible from the grid view):
  * when playing a video, the audio player will pause and autoresume
  * hotkey `r` to toggle video loop
  * hotkey `c` to toggle continue-playing-next-video
    * and added a toggle button for those two ^
  * remember the mute settings for the next videos
  * encourage browser to cache aggressively
  * dispose videos to stop them from buffering in the background

## bugfixes
* gallery: some keyboard hotkeys were buggy depending on focus

## other changes
* adjust the sfx text-editor warning to show it's OK to use hex editors
* minor ux tweaks
  * settings-reset link on the crashpage (underline, brightmode color)
  * brightmode: gallery filename / download link
  * main tabs unselectable




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0712-2254  `v0.11.39`  mob psycho

(get it? cause its the 100th release, at commit 888 even)

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.33](https://github.com/9001/copyparty/releases/tag/v0.11.33) fixes stability in the uploader client
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* add `--log-thrs` which periodically logs a summary of active threads
* `--stackmon` also runs inside the worker forks when using `-j`
* video player: hotkeys `f` for fullscreen and `m` for mute
* add a link which clears the settings on the js crash page, in case someone gets stuck by enabling grid mode on ie11 for example

## bugfixes
* the `?stack` link in the controlpanel required `/` to be a volume
* image gallery: shrink the image a bit so the link doesn't overlap
* cheap race "fix" for pypy

## other changes
* better thread names



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0711-2251  `v0.11.37`  just 2b safe

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.33](https://github.com/9001/copyparty/releases/tag/v0.11.33) fixes stability in the uploader client
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* log the list of files that couldn't be included in a tar/zip download

## bugfixes
* any potential cases of [surprising values in default arguments](https://user-images.githubusercontent.com/241032/125212304-bdb5e980-e2ac-11eb-962f-e1ee5cce510d.png), couldn't see anything bad luckily



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0711-0439  `v0.11.36`  foreshadowing

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.33](https://github.com/9001/copyparty/releases/tag/v0.11.33) fixes stability in the uploader client
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* video player -- click a webm/mp4 in the grid-view to play it
  * only does formats/codecs supported by your browser for now (thats the foreshadowing part)
* `--th-clean 0` disables periodic cleanup of the thumbnail cache 

## bugfixes
* image viewer trying to display folders named `something.jpg`
* py2 could not list/access files with unicode filenames when using volumes
  * when is centos7 eol again

## other changes
* some more context in exceptions
* thumbnail-generator: `mts` added to list of video file extensions



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0709-1512  `v0.11.34`  multi-process drifting (at low latency)

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.33](https://github.com/9001/copyparty/releases/tag/v0.11.33) fixes stability in the uploader client
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* faster http replies! reduced the time to establish new connections, so:
  * up to 25% faster round-trip time on short http requests with `-j1` (server-default), but more importantly...
  * up to 3.3x faster with `-j4` (now almost equal to `-j1`) and a single client doing stuff, but wait it gets better:
  * up to 6.6x faster with `-j4` and multiple clients hammering the server
  * but note that higher `-j` values adds more connection latency in exchange for processing power, https://en.wikipedia.org/wiki/Thundering_herd_problem
* discard log messages early when `-q` is set without `-lo`, giving better multiprocessing performance

## bugfixes
* fix general loss of centos7 support (TLnote: early 2.7 versions) introduced in [v0.11.30](https://github.com/9001/copyparty/releases/tag/v0.11.30)
  * also fixed downloading folders as zip-files which centos7 never could

## other changes
* `-j1` will be forced for python 2.7 because it cannot pickle tcp servers
* accessing `?stack` works on any url as long as you're admin *somewhere*
* the `-j` loadbalancer messages are gone because the loadbalancer is gone
  * should give a teeny-tiny performance boost to multiprocessing on uploads




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0707-0845  `v0.11.33`  moms spaghetti

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.33](https://github.com/9001/copyparty/releases/tag/v0.11.33) (this ver) fixes stability in the uploader client
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) fixes a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## bugfixes
* *another* crash in the up2k UI
* separate turbo-warning for search mode
* stop running ahead with handshakes if something uploaded recently
  * reduces the odds of skipping an upload which should have become a symlink



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0706-1958  `v0.11.32`  turbo button

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.32](https://github.com/9001/copyparty/releases/tag/v0.11.32) (this ver) fixes stability in the uploader client + a case of filesystem paths being unmasked
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* `turbo button` in the settings panel for superfast resume of massive uploads 
  * good for when you were in the middle of uploading 100'000 files and had to restart for some reason
  * comes at a serious cost: files will be skipped as long as they exist on the server with the right filesize, even if they could be incomplete uploads or are otherwise different from your local files, so you should do a "verification pass" by disabling turbo + refreshing + redoing the upload once you make it through
  * when combined with the new `date-chk` button it *should* notice and resume incomplete uploads but please do the verification pass anyways
  * all of this is explained in the tooltip for the button so idk why im putting it here too
* `-lo` enables xz-compressed logging to file in addition to printing to the console
  * with logrotate if the filename contains date-format-strings (like `%Y-%m-%d`)
  * when combined with `-q` it disables console-logging and only logs to file, gives a tiny speed boost depending on OS
  * also cleans up a few places with plain prints instead of the threadsafe pretty ones
* the volume-flags summary on startup now also print *which* volume they're talking about

## bugfixes
* `dir.txt` inside the thumbnails folder could be downloaded; possibly bad since it contains absolute-paths from the host filesystem
* [v0.11.31](https://github.com/9001/copyparty/releases/tag/v0.11.31) added parallel handshakes which could cause files to checksum and upload out-of-order, fixed
  * this also uncovered another UI-crash in the up2k client (nice) which is now also fixed separately
* a few more cases of recursive symlinks are detected and defused
  * symlink pointing to its own folder when creating a tar/zip
  * initial directory scanning (`-e2ds`)
    * initial directory scanning is now a tiny bit slower, sorry
* `-nw` didn't apply to PUT uploads
* more invalid requests get a sensible-ish reply stating what the client did wrong




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0704-1444  `v0.11.31`  an extra pair of hands

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.30](https://github.com/9001/copyparty/releases/tag/v0.11.30) fixes stability in the uploader client
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* parallel handshakes
  * faster uploads and file-search, especially on tiny files / high-latency connections

## bugfixes
* send keepalive handshakes when an upload has been paused / idle for 5h 45min so it doesn't expire
  * fixes one of the v0.11.30 known-bugs but still no idea what that other thing was, something about "bad file descriptor" right before a power outage so the logs are lost, shoganai
* race conditions in the up2k-server which couldn't be hit before parallel handshakes was added



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0701-2027  `v0.11.30`  the up2k-client update

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.30](https://github.com/9001/copyparty/releases/tag/v0.11.30) (this ver) fixes stability in the uploader client
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## known bugs
* if an upload is paused by setting `parallel uploads` to `0` in the UI...
  * ...for "about an hour", it *might* be unable to resume
  * ...for 6 hours or more, it is **definitely** unable to resume

unless the upload was paused for 6 hours or more, it can probably be resumed by refreshing the website and restarting the upload ("probably" because haven't been able to reproduce)

## new features
* up2k-client: 100x faster initialization when adding lots of files
* cachebuster to force chrome to use the correct js/css files since it ignores the no-cache header
* make `-nw` apply to more stuff (up2k skips creating files)

## bugfixes
* up2k-client:
  * fix crash caused by parallel uploads running far ahead, ui trying to update stuff it already purged
    * mostly problematic when uploading lots of small files mixed with slightly-larger files
  * general robustness
    * recover from tcp/dns issues during chunk-uploads
    * recover from antivirus yanking files mid-read
    * ignore server complaining about duplicate chunks, it's fine
  * help chrome not get stuck when it sees a file named `aux.h` on windows
  * notice and panic on more errors
    * and stop trying to do things after something died to an unhandled exception
  * less confusing debug messages regarding sha512 library selection




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0629-2351  `v0.11.29`  thx kip

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features suggested by kipu
* pause uploads by setting `parallel uploads` to `0`
* increase max `parallel uploads` to 16 (using +/- buttons) and 64 (by manual text entry) to accomodate sad american internet connections
* also look for `cover.jpg` and `cover.png` as folder thumbnails by default, adjustable with `--th-covers`
* change the description in the sfx so the corruption warning is the first plaintext you see

## other new features
* search ui could be visibly confusing if the final text entry event happened in the middle of a search
* adjustable `tint` on the audio-player progressbar to make buffering updates less visually distracting
* per-http-connection request counter appended to the transfer speed summary

## bugfixes
* ctrl-clicking folders in the directory tree didn't open them in a new tab
* javascript panic-screen could display the wrong stack in some cases



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0628-1336  `v0.11.28`  fix no-accounts crash

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* recent maybe-important updates:
  * [v0.11.28](https://github.com/9001/copyparty/releases/tag/v0.11.28) (this version) fixes crash if no accounts are defined
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* adjust tree width with hotkeys `a/d`
  * thumbnail zoom is now shift+`a/d`
* control-panel link always points to the webroot (mostly cosmetic)

## bugfixes
* lost replies (http handler crash) if you're running without any accounts



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0625-2023  `v0.11.27`  audiogrid

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* additional steps for [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) apply to this version if upgrading from something before that
* additional steps for [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) apply to this version if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* seek in songs by scrollwheeling the seekbar (very popular request)
* in the gridview...
  * play audio files when the audio panel is open (press P to open it)
  * navigate into subfolders without doing a full-page reload
* when password is given in the URL (`?pw=wark`), copy into cookie for persistence

## bugfixes
* icon for the button to leave search results in grid-view




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0625-0110  `v0.11.26`  smooth

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* see [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) description if upgrading from something before that
* see [v0.11.24](https://github.com/9001/copyparty/releases/tag/v0.11.24) description if you ever used versions v0.11.20 through v0.11.23
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* play/pause makes audio volume fade in/out
* jump to start of song if previous-track button is pressed more than 3sec into it
* media-controls are now default-enabled
* censor user passwords in the server log

## bugfixes
* panic if pressing play/pause in a folder without music
* send utf-8 header for all css/js files (fixes unicode/emotes in custom css)
* when switching folders,
  * clear the mediasession (currently playing track info in the OS)
  * blank the audio seekbar 
* unlikely-to-encounter bugs:
  * retry filesearch if client hits a ratelimit
  * extremely-unlikely:
    * fix autoplay of audio in some buggy chrome installs (not any specific version; depends on win10 settings or something)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0622-1528  `v0.11.24`  no cover

* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* if upgrading from [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) or later and you use `-e2ts` to index audio tags:
  * do a single run with `-e2tsr` to wipe and reindex audio tags to fix songs with bad titles
  * if you have expensive `-mtp` parsers (bpm/key) and a huge database (or a slow server), then make a backup of the db before `-e2tsr` and use https://github.com/9001/copyparty/tree/master/bin#dbtoolpy to transfer your tags to the new db
* however if upgrading from something before that, then your database will be wiped anyways so forget the `-e2tsr` stuff above, check the [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) notes instead
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## bugfixes
* don't pollute audio tags with metadata about embedded album covers (and other similar crosstalk)
* icon-generator: realize it's not a file extension when a whitespace appears
* discard and regenerate corrupted databases instead of giving up



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0621-1915  `v0.11.23`  in control, mk.II

* drop-in upgrade; no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)
  * but see the description in [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) if upgrading from something before that
* latest important update: [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20)
* latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
![copyparty-osctl-fs8](https://user-images.githubusercontent.com/241032/122821375-0e08df80-d2dd-11eb-9fd9-184e8aacf1d0.png)
* OS integration for the audio player
  * show media controls on the OS lock-screen
  * listen to media-hotkeys globally
    * play/pause, next/prev track, seek fwd/back
  * disabled by default; enable in the `🎺` tab

## bugfixes
* append current user's password to the cover URL so windows can actually display it
* disable scandir for python 3.5 and older (no contextmgr)
* disable u2idx (searching) if sqlite3 is not available
* skip blank tags on np-clip

## notes
when you get tired of seeing the OSD popup which Windows doesn't let you disable: https://ocv.me/dev/?media-osd-bgone.ps1



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0620-1925  `v0.11.21`  database.avi

* see [v0.11.20](https://github.com/9001/copyparty/releases/tag/v0.11.20) if upgrading from an older version
  * aside from that, no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)
* the latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## bugfixes
* more responsive browser during db rebuilds



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0620-1732  `v0.11.20`  database.rmvb

**this release will discard and rebuild your database** (`.hist/up2k.db`)
* no actions necessary, it just takes a while
* no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1) actually
* the old database will be backed up automatically just in case
* if you have expensive `-mtp` parsers (bpm/key) and a huge database (or a slow server), you can transfer your tags to the new db using https://github.com/9001/copyparty/tree/master/bin#dbtoolpy

reason: [v0.11.12](https://github.com/9001/copyparty/releases/tag/v0.11.12) changed the file checksum algorithm slightly, causing a mismatch between the server and client, and as a result:
* upload deduplication has been unpredictable
* filesearch could return false-negatives

## new features
* much faster filesearch in chrome
* skip hidden colums in the /np text
* support cygpaths when pointing to mtag tools

## bugfixes
* uploading folders through the up2k client would fail if the folder already existed on the server; now they merge
* change up2k hashlen to 33 bytes / 44 chars (mod24 bits) to fit base64 better, avoiding any padding bugs
* prefer client IP rater than proxy IP as fallback value when `--rproxy` is configured out of bounds
* correct indexing of files with names containing backslash on linux/macos

## other notes
* the latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0618-2332  `v0.11.19`  purely cosmetic

* drop-in upgrade; no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)
* nothing big, no server fixes, just client tweaks
* recent important updates:
  * [v0.11.14](https://github.com/9001/copyparty/releases/tag/v0.11.14) fixed a deadlock in the thumbnails feature which was added in [v0.11.0](https://github.com/9001/copyparty/releases/tag/v0.11.0)
* summary of other recent updates:
  * [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18): audio preloading for near-gapless playback
  * [v0.11.17](https://github.com/9001/copyparty/releases/tag/v0.11.17): fix thumbnail cache eviction (*finally* something that broke in [v0.11.12](https://github.com/9001/copyparty/releases/tag/v0.11.12))
  * [v0.11.16](https://github.com/9001/copyparty/releases/tag/v0.11.16): more accurate audio equalizer
* the latest gzip edition of the sfx is [v0.11.18](https://github.com/9001/copyparty/releases/tag/v0.11.18)

## new features
* audio player: add some shadow to the timestamps in the progressbar
* audio player: silently stop playback if playing into a folder without music
* general ui: make radio selections more visible by using another text color
* general: smaller html responses by moving some stuff into the js (zopfli-compressed)

## bugfixes
* mobile devices: disable scrolling while viewing pictures in the lightbox
* mobile devices: tooltips in the toolbar
* android-chrome: text distortion in canvases when chrome decides to resize the viewport without invoking onresize like it should
* android-chrome: initial layout in up2k due to the viewport size taking some time to settle down
  * [totally appropriate fix](https://github.com/9001/copyparty/commit/57579b2fe5b86eaed062c050fb3c97d539db938f#diff-de02679bd0d9cdc88e772227cb23512033593913c128843e0bdf24810a786afaR1279-R1286)




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0617-2230  `v0.11.18`  seamless

* drop-in upgrade; no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)
* no important fixes, mostly new features
* recent important updates:
  * [v0.11.14](https://github.com/9001/copyparty/releases/tag/v0.11.14) fixed a deadlock in the thumbnails feature which was added in [v0.11.0](https://github.com/9001/copyparty/releases/tag/v0.11.0)

## notes
this release includes [copyparty-sfx-gz.py](https://github.com/9001/copyparty/releases/download/v0.11.18/copyparty-sfx-gz.py), an additional sfx build which uses gzip compression rather than the usual bzip2; only useful for smoketests on minimal python builds. Note that both past and future releases can be converted from bzip2 to gzip by running [copyparty-repack.sh](https://github.com/9001/copyparty/blob/master/scripts/copyparty-repack.sh) on linux/macos/windows-msys2; this will produce the additional sfx in this release, `copyparty-extras/sfx-full/copyparty-sfx-gz.py` (see [sfx-repack](https://github.com/9001/copyparty#sfx-repack) for more info)

## new features
* **(almost) gapless audio playback!** partially powered by:
  * url suffix `?cache` to get a response without any `Cache-Control` directives
  * and using events for end-of-track instead of polling
* hotkey `b` to toggle breadcrumbs / directory tree sidebar
  * hotkey `p` is now play/pause
  * hotkey `m` is now parent-directory
* hilight the playing track in gallery mode too
* toggle to disable the now-playing clipboard buttons
* added lots of tooltips
  * threw aray the competing tooltip implementations and did a single ok one
* more accurate error-messages on upload failures due to filesystem permissions
* add another output to the sfx repacker (gzip-compressed python sfx)

## bugfixes
* file selection after switching from grid to list
* playback into next folder if the tree sidebar is closed
* show the link to exit search results even if columns are hidden
* make an effort to terminate clients cleanly on shutdown
* py2 volume listing with `-e2d`




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0616-2231  `v0.11.17`  another media update

* drop-in upgrade; no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)
* recent important updates:
  * [v0.11.14](https://github.com/9001/copyparty/releases/tag/v0.11.14) fixed a deadlock in the thumbnails feature which was added in [v0.11.0](https://github.com/9001/copyparty/releases/tag/v0.11.0)

## new features
* hotkey `m` for play/pause
* make audio gain adjustable
  * cranking it way up behaves differently depending on browser; firefox adds a compressor, chrome just ***goes***
  * funfact, the base gain is `0.94` to avoid clipping due to imperfections in the equalizer curve
* responsive settings layout
* other minor ux tweaks
  * brightmode contrast and player widget
  * add gridlines to the files table
* print summary when thumbcache cleanup finishes

## bugfixes
* the audio-eq ui didn't handle leading/trailing decimals too well
* thumbcache-eviction mostly broke in [v0.11.12](https://github.com/9001/copyparty/releases/tag/v0.11.12) (and somehow nothing else so far)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0615-2351  `v0.11.16`  better eq

* drop-in upgrade; no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)
* recent important updates:
  * [v0.11.14](https://github.com/9001/copyparty/releases/tag/v0.11.14) fixed a deadlock in the thumbnails feature which was added in [v0.11.0](https://github.com/9001/copyparty/releases/tag/v0.11.0)

## new features
* media player can now continue into the next folder
* eq curve supports both positive and negative values (and scales down to avoid clipping)
* browser columns now fully hide when hidden; reenable them in the settings tab
* other ux tweaks
  * add some icons
  * tree control buttons remain visible when scrolling

## bugfixes
* calibrated the eq for more correct frequency response




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0614-2201  `v0.11.15`  v for victory

* drop-in upgrade; no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)
* recent important updates:
  * [v0.11.14](https://github.com/9001/copyparty/releases/tag/v0.11.14) fixed a deadlock in the thumbnails feature which was added in [v0.11.0](https://github.com/9001/copyparty/releases/tag/v0.11.0)

## new features
* audio equalizer (with a v-shaped default)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0614-0105  `v0.11.14`  frozen

* this release fixes a deadlock in the thumbnails feature introduced in [v0.11.0](https://github.com/9001/copyparty/releases/tag/v0.11.0)
  * if you cannot upgrade for some reason, use `--no-thumb` to avoid it
* drop-in upgrade; no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)

## new features:
* `--rproxy` specifies which IP to display in logs when reverse-proxied
  * defaults to `1` which is the origin / actual client
* `--stackmon` periodically dumps a stacktrace to a file for debugging

## bugfixes:
* deadlock when converting thumbnails
* up2k-cli: recover from network errors during handshakes
  * have to fix chunks too eventually



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0612-1837  `v0.11.13`  image gallery

[v0.11.11](https://github.com/9001/copyparty/releases/tag/v0.11.11) is the latest well-tested version ("stable"), maybe keep that as a fallback
* otherwise a drop-in upgrade; no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)

## recent updates
nothing really important happened since [v0.11.6](https://github.com/9001/copyparty/releases/tag/v0.11.6); quick summary:
* [v0.11.9](https://github.com/9001/copyparty/releases/tag/v0.11.9): fix zip/tar of recursive symlinks
* [v0.11.10](https://github.com/9001/copyparty/releases/tag/v0.11.10): fix direct tls connections
* [v0.11.11](https://github.com/9001/copyparty/releases/tag/v0.11.11): fix live-rescan without a root folder
* this ver only adds new features

## new features:
* image gallery / lightbox

## notes
if you want filetype icons on the thumbnails then check out [browser-icons.css](https://github.com/9001/copyparty/tree/master/docs#example-browser-css)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0612-0228  `v0.11.12`  excuse the mess

big changes, **bugs likely**, keep [v0.11.11](https://github.com/9001/copyparty/releases/tag/v0.11.11) as a fallback and go whine in the irc
* otherwise a drop-in upgrade; no additional steps to consider since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)

nothing really important happened since [v0.11.6](https://github.com/9001/copyparty/releases/tag/v0.11.6); quick summary:
* [v0.11.9](https://github.com/9001/copyparty/releases/tag/v0.11.9): fix zip/tar of recursive symlinks
* [v0.11.10](https://github.com/9001/copyparty/releases/tag/v0.11.10): fix direct tls connections
* [v0.11.11](https://github.com/9001/copyparty/releases/tag/v0.11.11): fix live-rescan without a root folder
* this ver only fixes unlikely edge-cases

## new features:
* folder thumbnails if they contain `folder.jpg` or `folder.png`, good for music servers
* `--hist` stores the per-volume databases and thumbnails all in one place, instead of the `.hist` subfolders in each volume
* `--no-hash` disables file hashing, good for a simple searchable index, but keep in mind it disables file-search and dupe detection
  * both this and `--hist` can be adjusted per-volume with volflags, see readme
* thumbnails keep transparency
* `--th-ff-jpg` fixes video thumbnails if your FFmpeg is bad (macos)
* more info in the [admin panel](https://user-images.githubusercontent.com/241032/121763646-15422780-cb3e-11eb-8932-130af39acb48.png) (num.files queued for hashing or tags)
* `--css-browser` to set [custom CSS](https://user-images.githubusercontent.com/241032/121763647-15dabe00-cb3e-11eb-90a4-1628a072545c.png)
  * use `.prologue.html` or `.epilogue.html` to do this per-folder; that allows for javascript too
* cygpaths for windows, `-v c:\users::r` and `-v /c/users::r` both work now
* extremely minor (i think) performance improvements which probably drown in the new bloat

## bugfixes:
* mounting a volume deep inside another volume will no longer create additional databases, avoiding rescan of files in intermediate folders
  * backwards-compat so it will continue to use any intermediate databases made by v0.11.11 or older
* better error message on basic-upload into a folder that doesn't exist / without permission
* minor race introduced in 0.11.1 which could be triggered by an upload really early after starting the server




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0608-2143  `v0.11.11`  re:live

* drop-in upgrade, no additional steps since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)
* nothing really important since [v0.11.6](https://github.com/9001/copyparty/releases/tag/v0.11.6); quick summary:
  * [v0.11.9](https://github.com/9001/copyparty/releases/tag/v0.11.9): fix zip/tar of recursive symlinks
  * [v0.11.10](https://github.com/9001/copyparty/releases/tag/v0.11.10): fix direct tls connections
  * this ver: fix live-rescan without a root folder

## new features
* threadnames in the stackdump
  * also truncate/censor filepaths
  * most of the idle threads are indented + appear last
* up2k scans folders alphabetically (easier to eyeball progress)
* slightly better performance when sending files
  * and other minor performance tweaks
* sfx: all js/css files are zopfli-compressed
  * makes sfx bigger but resources are now 1/3 the size in transit

## bugfixes
* another live-rescan fix (for configs without a root-folder)
* fix janky load-balancing with `-jN`




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0608-0741  `v0.11.10`  dont leave me hangin

* drop-in upgrade, no additional steps since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)
* nothing really important since [v0.11.6](https://github.com/9001/copyparty/releases/tag/v0.11.6)
  * [v0.11.9](https://github.com/9001/copyparty/releases/tag/v0.11.9): fix zip/tar of recursive symlinks
  * this ver: fix direct tls connections

## bugfixes
* actually close tls connections
  * only affects direct https connections (no reverse-proxy between)
  * mainly problematic for zip/tar downloads



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0607-1822  `v0.11.9`  caught in a loop

* nothing too important (unless you have recursive symlinks somewhere)
* drop-in upgrade, no additional steps since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)

## new features
* `--ls` prints empty directories as well
  * so now links like that will be detected too

## bugfixes
* detect recursive symlinks when creating zip/tar files
  * the first iteration will be archived, then it bails
* support python 3.5 on windows by autosetting `--no-scandir`
* `sfx.sh` correctly disables bundled jinja2 when found on system




▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0606-1709  `v0.11.8`  sharex

* nothing important
* drop-in upgrade, no additional steps since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)

## new features
* json replies from `bput` (basic uploader) by adding url parameter `j`
  * better sharex support, especially for interesting filenames
* append the filename extension when renaming uploads to avoid filename collisions



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0605-0133  `v0.11.7`  additional vtec

* nothing too important
* drop-in upgrade, no additional steps since [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1)

## new features
* add [hash-wasm](https://github.com/Daninet/hash-wasm) as preferred fallback up2k hasher, does 250 MiB/s so like 7x faster
  * still keeping `asmCrypto` for older browsers but minified a bit
  * technically this allows for a single sha512 over the whole file rather than chunks...
* in gallery mode, open files in a new tab if there's a selection active
* `--ls`, which can be used to look for dangerous symlinks
  * `--ls '**,*,ln,p,r'` does a full scan of all volumes (as all users) and refuses to start if there are links leaving the vols (see `--help`)
* other minor optimizations

## bugfixes
* metadata indexing with single-threaded backends
* loader animation appears over thumbnails too
* restore support for firefox 12



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0601-0625  `v0.11.6`  vtec

### things to know when upgrading:
* see release-notes for [v0.11.0](https://github.com/9001/copyparty/releases/tag/v0.11.0) and [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1) as they introduced new features you may wish to disable

### new features:
* searching for audio tags is now literally 1000x faster
  (almost as fast as the version numbers recently)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0601-0155  `v0.11.4`  please upgrade

## important news:
* this release fixes a missing permission check which could allow users to download write-only folders
  * this bug was introduced 19 days ago, in `v0.10.17`
  * the requirement to be affected is write-only folders mounted within readable folders
  * and the worst part is there was a unit-test exactly for this, https://github.com/9001/copyparty/commit/273ca0c8 way overdue
* also fixes minor bugs introduced in `v0.11.1`
* this version is the same as `v0.11.5` on pypi

----

### things to know when upgrading:
* see [v0.11.0](https://github.com/9001/copyparty/releases/tag/v0.11.0) and [v0.11.1](https://github.com/9001/copyparty/releases/tag/v0.11.1) as they introduce new features you may wish to disable
  * especially the `dbtool` part if your database is huge

### new features:
* filesearch now powered by a boolean query syntax
  * the regular search interface generates example queries
  * `size >= 2048 and ( name like *.mp4 or name like *.mkv )`

### bugfixes:
* scan files on upload (broke in 0.11.1)
* restore the loud "folder does not exist" warning (another 0.11.1)
* fix thumbnails in search results (never worked)

#### really minor stuff:
* increased default thumbnail clean interval from 30min to 12h
* admin panel also links to the volumes



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0529-2139  `v0.11.1`  do it live

no important bugfixes, just new features

### things to know when upgrading:
* `--no-rescan` disables `?scan`, a new feature which lets users initiate a recursive scan for new files to hash and read tags from
  * this is enabled per-volume for users with read+write access
* `--no-stack` disables `?stack`, a new feature which shows a dump of all the stacks
  * this is enabled if a user has read+write on at least one folder
* if you wish to wipe the DB and rebuild it to get the new metadata collected as of v0.11.0, and you have expensive `-mtp` parsers (bpm/key) and a huge database (or a slow server), consider https://github.com/9001/copyparty/tree/master/bin#dbtoolpy

### new features:
* **live rescan!** no more rebooting if you add/move files outside of copyparty and want to update the database, just hit the rescan button in the new...
* **admin panel!** access `/?h` (the old control-panel link) to see it
* **fast startup!** added 40TB of music? no need to wait for the initial scan, it runs in the background now
  * when this turns out to be buggy you can `--no-fastboot`
  * uploading is not possible until the initial file hashing has finished and it has started doing tags
    * you can follow the progress in the new admin panel

### bugfixes:
* windows: avoid drifting into subvolumes and doublehashing files



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0529-1303  `v0.11.0`  welcome to the grid

no important bugfixes, just new features

### things to know when upgrading:
* `Pillow` and `FFmpeg` is now used to generate thumbnails
  * `--no-thumb` disables both
  * `--no-vthumb` disables just `FFmpeg`
* new optional dependencies:
  * `Pillow` to enable thumbnails
    * `pyheif-pillow-opener` to enable reading HEIF images
    * `pillow-avif-plugin` to enable reading AVIF images
    * `ffmpeg` and `ffprobe` to enable video thumbnails
* if you wish to wipe the DB and rebuild it to get the new metadata collected as of this version, and you have expensive `-mtp` parsers (bpm/key) and a huge database (or a slow server), consider https://github.com/9001/copyparty/tree/master/bin#dbtoolpy

### new features:
* thumbnails! of both static images and video files
  * served as webp or jpg depending on browser support
  * new hotkeys: G, T, S, A/D
* additional metadata collection with `-e2ts`
  * audio/video codecs, video/image resolution, fps, ...
  * if you wanna reindex, do a single run with `-e2tsr` to wipe the DB
* mtp can collect multiple tags at once
  * expects json like `{ "tag": "value" }`, see end of https://github.com/9001/copyparty/blob/master/bin/mtag/exe.py

### bugfixes:
* when sorting by name, show folders first
* mimetypes for webp and opus on GET
* mojibake support
  * up2k into mb folder
  * indexing files in mb folders
  * editing markdown in mb folders



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0518-0210  `v0.10.22`  this is a no drift zone

* browser: fix off-by-one which made the page slowly shrink back down when navigating away from a large folder
* browser/mediaplayer: handle unsupported audio codecs better in some (older?) browsers
* readme/requirements: firefox 34 and chrome 41 were the first browsers with native sha512 / full speed in up2k
* and the feature nobody asked for:
![2021-0518-041625-hexchat-fs8](https://user-images.githubusercontent.com/241032/118581146-67876700-b791-11eb-99c0-f1f5ace50797.png)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0516-1822  `v0.10.21`  fix tagger crash

a



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0516-0551  `v0.10.20`  inspect

nothing important this time, just new bling and some fixes to support old browsers  
(well except for the basic-uploader summary autoclosing immediately on completion, that was kinda user-confusing)

* add `ad`/`an` flags to `-mtp`; collect and display metadata from any file, not just audio-files
* up2k speedboost on older iPhones (native hashing on safari 7 through 10)
* add `--lf-url`, URL regex to exclude from log, defaults to `^/\.cpr/` (static files)
* add `--ihead` to print specific request headers, `*` prints all
* ux fixes
  * include links to the uploaded files in bup summaries
  * ...also make the bup summary not auto-close
  * don't link to bup from up2k if read-only access
  * toggle-switch for tooltips also affects the up2k ui
  * stop flipping back to up2k on older browsers



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0513-2200  `v0.10.19`  imagine running servers on windows

* fix: uploads when running copyparty on windows (broke in 0.10.18)
* fix: bup uploads would not get PARTIAL-suffixed if the filename length hits filesystem-max and the client disconnects mid-upload 
* add `--dotpart` which hides uploads as dotfiles until completed
* very careful styling of the basic-browser



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0513-1542  `v0.10.18`  just 302 it my dude

* stop trying to be smart, do full redirects instead
* allow switching to basic-browser using cookie `b=u`
* fix mode-toggling (upload/search) depending on folder permissions
* persist/clear the password cookie with expiration
* slight optimizations for rclone clients
* other minor ui tweaks



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0512-2139  `v0.10.17`  denoise

* allow navigating to write-only folders using the tree sidebar
* show logues (prologue/epilogue) in write-only folders as well
  * rename `.prologue.html` / `.epilogue.html` when uploaded so people can't embed javascript
* support pyinstaller
* hide more of the UI while in write-only folders
  * hide [even more](https://a.ocv.me/pub/g/nerd-stuff/cpp/2021-0513-ui-mod.png) using [lovely hacks](https://github.com/9001/copyparty/blob/master/docs/minimal-up2k.html)
* add a notice in bup that up2k is generally better

alternative title: [Petit Up2k's - No Gui!](https://www.youtube.com/watch?v=IreeUoI6Kqc)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0502-0718  `v0.10.16`  somebody used -c

* cfg-file: fix shorthand for assigning permissions to anonymous users
* sfx: `-j` works on python3 (pickle did not enjoy the binary comments)
* sfx: higher cooldown before it starts deleting tempfiles from old instances
* sfx: should be a bit smaller (put compressed blobs at the end of the tar)
* misc minor ui tweaks, mostly the bright-mode theme



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0424-0205  `v0.10.15`  write-only volumes are write-only

good thing it was so obviously broken and/or that nobody ever tried to use it
* regression test added to keep it fixed
* can now make a hidden/inaccessible folder (optionally inside a public folder) like `-v /mnt/nas/music:/music:r -v /mnt/nas/music/inc:/music/inc:w`

in other news, minor ui tweaks:
* clickdrag in the media player sliders doesn't select text any more
* a few lightmode adjustments
* less cpu usage? should be

`copyparty-sfx.py` (latest) made from c5db7c1a (v0.10.15-15) fixes `-j` (multiprocessing/high-performance)
`copyparty-sfx-5a579db.py` (old) made from 5a579dba (v0.10.15-5) reduced the size



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0421-2004  `v0.10.14`  sparse4win

# great stuff
* firefox no longer leaking memory like crazy during large uploads
    * not fixed intentionally (the firefox bug still exists i think)
        * one of the v0.10.x changes are accidentally avoiding it w

# good stuff
* up2k-cli: conditional readahead based on filereader latency (firefox was not happy)
* up2k-srv: make sparse files on windows if larger than `--sparse` MiB
    * files will unsparse when upload completes if win10 or newer
    * performance gain starts around 32 and up but default is 4 to save the SSDs
* up2k-cli: fix high cpu usage after returning to idle
* up2k-cli: ui tweaks
* browser: give 404 instead of redirecting home when folder is 404 or 403
* md-srv: stream documents rather than load into memory



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0420-2319  `v0.10.13`  moon

600 MiB/s for both hashing and uploading on a ryzen 3700

* up2k: hashing 2x faster than before
    * except on android-chrome where it is now slightly slower because the android file api is a meme
        * ...but android-firefox gained 4x and is now 3x faster than chrome, google pls

this concludes the optimization arc



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0419-1958  `v0.10.12`  rocket

up2k [way faster on large files](https://a.ocv.me/pub/g/nerd-stuff/cpp/2021-0419-up2k.webm) this time
* js: removed a cpu bottleneck in the up2k client



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0419-1517  `v0.10.10`  blinded by the light

* up2k: fix progress bars
* up2k: more specific error messages (for example when trying to up a rangelocked file)
* browser: link to timestamps in media files (media fragment urls)
* fix crash when trying to -e2ts without the necessary dependencies available
* since there wasn't enough pointless features that nobody will ever use already: added lightmode



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0416-2329  `v0.10.9`  fasten your seatbelts

* up2k: [way faster](https://a.ocv.me/pub/g/nerd-stuff/cpp/2021-0416-up2k.webm) when uploading a large number of files
  * 2x faster at 500 files, 3x faster at 1000, **8x at 3000**
* up2k: show ETA and upload/hashing speeds in realtime
* browser: hide search tab when database disabled
* avoid crash on startup when mounting the root of a restricted smb share on windows, [cpython bug](https://bugs.python.org/issue43847)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0411-1926  `v0.10.8`  misc

nothing massive, just a bunch of small things

* browser: fix zip download on iphone/android
* sfx: prevent StorageSense from deleting copyparty while it's running
* browser: less tree jitter when scrolling
* browser: only capture hotkeys without modifiers
* up2k: add some missing presentational uridecodes
* browser: add `?b` for an extremely minimal browser
    * `?b=u` includes the uploader
* browser: somewhat support `?pw=hunter2` in addition to the cppwd cookie
* make-sfx: optional argument `gz` to build non-bz2 sfx
* stop crashing argparse on pythons <= june 2018
* support http/1.0



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0402-2235  `v0.10.7`  thx exci

up2k-client fixes:
* uploads getting stuck if more than 128 MiB was rejected as dupes
* displayed links on rejected uploads
* displayed upload speed was way off



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0402-0111  `v0.10.6`  enterprise ready

minimal-effort support for really old browsers
* internet explorer 6 can browse, upload files, mkdir
* internet explorer 9 can also play mp3s, zip selected files
* internet explorer 10 and newer has near-full support
* the final version of chrome and firefox on xp have full support
* netscape 4.5 works well enough, text is yellow on white
* [netscape 4.0 segfaults](https://a.ocv.me/pub/g/nerd-stuff/cpp/2021-0402-netscape.png) (rip)

on a more serious note,
* fix multiselect zip diving into unselected subfolders
* decode urlform messages to plaintext



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0330-2328  `v0.10.5`  search fix

* fix audio playback in search results (broke in v0.9.9)
* sort search results according to userdefined order



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0329-1853  `v0.10.4`  stablesort

running out of things to fix so here are nitpicks
* stable sort when sorting multiple columns
* default to filenames with directories first (column 2 + 1)
* remove some console spam



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0329-0247  `v0.10.3`  not slow as tar

nothing too big this time,
* tar 6x faster (does 1.8 GiB/s now)
* fix selective archiving of subfolders
* mute the loadbalancer when `-q`
* don't show 0:00 as duration for non-audio files

known inconvenience since 0.9.13 that won't ever be fixed:
if you use the subfolder hiding thing (`-v :foo/bar:cd2d`) it creates intermediate volumes between the actual volume and the hidden subfolder which kinda messes with existing indexes (it will reindex stuff inside the intermediate volumes) but everything still works so it's just a pain



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0327-1703  `v0.10.2`  do i have to think of a name

* select multiple files/folders to download as tar/zip
* recover from read-errors when zipping things, adding a textfile in the zip explaining what went wrong
* fix permissions in zip files for linux/macos unpacking
* make the first browser column sortable



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0327-0144  `v0.10.1`  zip it

* download folders as .zip or .tar files
* upload entire folders by dropping them in
* 4x faster response on the first request on each new connection

forgot to explain the zip formats

| name | url-suffix | description |
|--|--|--|
| `tar` | `?tar` | a plain gnutar, works great with `curl \| tar -xv` |
| `zip` | `?zip=utf8` | works everywhere, glitchy filenames on win7 and older |
| `zip_dos` | `?zip` | traditional cp437 (no unicode) to fix glitchy filenames |
| `zip_crc` | `?zip=crc` | cp437 with crc32 computed early for truly ancient software |

`zip_crc` will take longer to download since the server has to read each file twice, please let me know if you find a program old enough to actually need it btw, curious



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0323-0113  `v0.9.13`  micromanage

you can skip this version unless your volume setup is crazy advanced

* support hiding specific subfolders with `-v :/foo/bar:cd2d`
* properly disable db/tags/etc when `cd2d` or `cd2t` volflags are set
* volume info on startup is prettier



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0321-2105  `v0.9.10`  nurupo

not so strong anymore

* fixes a nullpointer when sorting a folder that contains markdown revisions



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0321-1615  `v0.9.9`  the strongest

## big ones
* add support for external analysis tools to provide arbitrary tags for the index
* add example tools for detecting bpm and melodic key
  * https://github.com/9001/copyparty/tree/master/bin/mtag
* add range-search (duration/bpm/key/... between min/max values)
* hotkeys for changing songs + skipping
  * `0..9`=jump, `J/L`=file, `U/O`=10sec, `K/I`=folder, `P`=parent

## the rest
* add search timeouts and rate-control on both server/client-side
* add time markers in the audio player
* remember the file browser sort order
  * the initial html retains server order, so use the tree to navigate
* fix a race in the tag parser when using the multithreaded FFprobe backend
* fix minor stuff related to volume flags and tag-display options
* repacker should no longer break the bundled jinja2



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0315-0013  `v0.9.8`  the strongest for a while

nothing more to add or fix for now (barely avoided adding bpm/tempo detection using keyfinder and vamp+qm since thats just too ridiculous)

* browser: correct music playback order after sorting
* browser: no more glitching on resize in non-tree-mode
* fuse-client: read password from `some.txt` with `-a $some.txt`
* sfx: reduce startup time by 20% or so (import rather than shell out)
* sfx: support pypy, jython, and ironpy



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0308-0251  `v0.9.7`  the strongest hotfix 2nd season

* actually fix it so it doesn't truncate in the first place



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0307-2044  `v0.9.6`  the strongest hotfix

* don't crash the file browser on truncated table rows



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0307-1825  `v0.9.5`  the strongest potions

* better support for mojibake filenames
* separate scrollbar for the directory tree
* stop persisting page data in the browser, reload on each navigation
  * firefox disapproves of storing >= 4 MB of json in sessionStorage
* normalization of musical keys collected from tags
* recover from dying tag parsers
* be nice to rhelics
  * add support for the 2013 edition of sqlite3 in rhel 7
  * and fix some py2 issues with `-e2d`, again thx to ^



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0305-0106  `v0.9.4`  the strongest orz

markdown editor works



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0304-2300  `v0.9.3`  the strongest performance

gotta go fast

| | windows | linux | macos |
|--|--|--|--|
| file browser / directory listing | *15 times* faster | 2% slower sorry | 15% faster |
| startup / `-e2ds` verification | 10% faster | even | 10% faster |
| reading tags with ffprobe | 5 times faster | 4 times faster | 2 times faster |

## new features
* async scan incoming files for tags (from up2k, basic-upper, PUT)
* resizable file browser tree

## bugfixes
* floor mtime so `-e2ds` doesn't keep rescanning
* use localStorage for pushState data since firefox couldn't handle big folders
* minor directory rescan semantics



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0303-0028  `v0.9.1`  the strongest bugs

imagine downloading a .0
* fix file search / search by contents
* stop spamming responses with `{"tags":["x"]}`
* recover from missing writable volumes during startup
* redo search when filter-checkboxes are toggled
* 1.5x faster client-side sorting
* 1.02x faster server-side

and i just realized i never added runtime tag scanning so copyparty will have to be restarted to see tags of new uploads, TODO for next ver



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0301-2312  `v0.9.0`  the strongest music server

* grab tags from music files and make them searchable
* and show the tags in the file browser
* make all the browser columns minimizable
* shrink the media player widget thing on big screens

use `-e2dsa` and `-e2ts` to enable the media tag features globally, or enable/disable them per-volume (see readme)

**NOTE:** older fuse clients (from before 5e3775c1  / older than v0.8.0) must be upgraded for this copyparty release, however the new client still supports connecting to old servers

other changes include
* support chunked PUT requests from curl
* fix a pypy memleak which broke sqlite3
* fix directory tree sidebar breaking when nothing is mounted on `/`



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0222-2058  `v0.8.3`  discovery

forgot to update the release name for 0.8 (which introduced searching and directory trees), good opportunity to name it after a dope album with some absolute bangers

aside from the release name this version is entirely unrevolutionary

* fixed debug prints on xp / win7 / win8 / early win10 versions
* load prologues/epilogues when switching between folders
* fix up2k modeswitching between read/write folders
* additional minor ux tweaks



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0222-0254  `v0.8.1`  the ux update

* search by name/path/size/date
* search by file contents
* directory tree sidebar thing
  * navigate between folders while uploading

NOTE: this will upgrade your `up2k.db` to `v2` but it will leave a backup of the old version in case you need to downgrade or whatever



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0214-0113  `v0.7.7`  trafikklys

* new checkbox in up2k which coordinates uploading from multiple tabs
  * if one tab is uploading, others will wait
* fix up2k handshakes so uploads complete faster



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0212-1953  `v0.7.6`  nothing big

* up2k: resume hashing when <= 128 MiB left to upload
* stop showing `up2k.db/snap` in the file list
* fix `--ciphers help`



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0212-0706  `v0.7.5`  you can https if you want to

* fix https on python3 after breaking it in v0.6.3
  * workaround for older versions: `--no-sendfile`
  * don't use the native https anyways (pls reverse-proxy)
* that said, added a bunch of ssl/tls/https options
  * choice to only accept http or https
  * specify ssl/tls versions and ciphers to allow
  * log master-secrets to file
  * print cipher overlap on connect
* up2k indexer flushes to disk every minute
* up2k indexer mentions the filepath on errors



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0204-0001  `v0.7.4`  a

* sfx: save 43kB by replacing all docstrings with "a"
* sfx: upgrade the bundled jinja2 and markupsafe
    * zero dependencies on python3 as well now
* do something useful with url-encoded POSTs



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0202-2357  `v0.7.3`  Hey! Listen!

* bind multiple IP's / port ranges
* dim the connection tracking messages a bit
* stop gz/br unpacker from being too helpful



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0128-2352  `v0.7.2`  QUALITY

* make up2k confirmations optional
* let pending uploads stay for 6 hours
* fix the 0.7.1 regression we won't talk about



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0123-1855  `v0.7.1`  checking it twice

* up2k-client shows an OK/Cancel box before upload starts
* up2k-client hashes the next pending file at most
  * previously, all pending uploads were announced immediately
* fix edgecase when the registry snapshot contained deleted files
* delete all related files after 1h if an up2k upload was initiated but never started
  * previously, the `.PARTIAL` (upload data) was kept, even when blank



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0110-1649  `v0.7.0`  keeping track

## remember all uploads using `-e2d` to avoid duplicates
* `-e2d` stores the up2k registry in a per-volume sqlite3 database at `$VOL/.hist/up2k.db`
* unfinished uploads are indexed in `$VOL/.hist/up2k.snap` every 30 seconds
* unfinished uploads which are idle for over 1 hour are forgotten
* duplicate uploads will be symlinked to the new name (by default) or rejected

## build an index of all existing files at startup using `-e2s`
* ...so copyparty also knows about files from older versions / other sources
* this detects deleted/renamed files and updates the database

## reject duplicate uploads instead of symlinking
* this is a per-volume config option, see the `cnodupe` example in `-h`
* the uploader gets an error message with the path to the existing file

## other changes
* uploads temporarily have the extension `.PARTIAL` until the upload is completed



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2021-0107-0009  `v0.6.3`  no nagles beyond this point

* reduce latency of final packet by ~0.2 sec
* use sendfile(2) when possible (linux and macos)



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-1214-0328  `v0.6.2`  happy end of 2020

* support uploads with massive filenames
* list world-readable volumes when logged in
* up2k-client: ignore rejected dupe uploads
* sfx-repack: support wget
* dodge python-bug #7980 



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-1201-0158  `v0.6.0`  CHRISTMAAAAAS

https://www.youtube.com/watch?v=rWc9XuqwoLI
* md cleanup/fixes (thx eslint)
* fix the sfx repacker



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-1130-0201  `v0.5.7`  multiuser notepad

not in the etherpad sense but rather
* md: poll for changes every `-mcr` sec and warn if doc changed
* md: prevent closing the tab on unsaved changes



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-1129-1849  `v0.5.6`  the extra mile

* use git tag/commit as version when creating sfx
* md: table prettyprinter compacting properly
* md/plug: add error handling to the plugins
* md/plug: new feature to modify the final dom tree
* md/plug: actually replace the plugin instances rather than keep adding new ones tehe



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-1127-0225  `v0.5.5`  far beyond

valvrave-stop.jpg



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-1117-2258  `v0.5.4`  edovprim

(get it? becasue reverse proxy haha)

* reverse-proxy support
* filetype column in the browser
* md-edit: table formatter more chill



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-1113-0231  `v0.5.3`  improved

* show per-connection and per-transfer speeds
* restore macos support in sfx.sh
* http correctness fixes
  * SameSite=Lax
  * support multiple cookies in parser
  * `+` no longer decodes to ` `, goodbye netscape 3.04
* fuse stuff
  * python client: mojibake support on windows
  * python client: https and password support
  * support rclone as client (windows/linux)
* new markdown-editor features
  * table formatter
  * mojibake/unicode hunter
  * more predictable behavior



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0818-1822  `v0.5.2`  da setter vi punktum

full disclaimer: `copyparty-sfx.py` was built using `sfx.py` from ~~82e568d4~~ f550a817



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0817-2155  `v0.5.1`  insert soho joke

* add info-banner with hostname and disk-free
* make older firefox versions cache less aggressively
* expect less correctness from cots nas



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0816-2304  `v0.5.0`  fuse jelly

* change default port from `1234` to `3923`
* fuse 10x faster + add windows support
* minimal CORS support added
* PUT stuff from a browser-console or wherever
* markdown editor improvements again
  * paragraph-jump with ctrl-cursors
  * fix firefox not showing the latest ver on F5
* fix systemd killing the sfx binaries (ﾉ ﾟヮﾟ)ﾉ ~┻━┻
* not actually related to the tegra exploit



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0517-1446  `v0.4.3`  🌲🪓🎉

* print your documents! kill the trees!
* drop support for opus/vorbis audio playback on iOS 11 *and older*
* chrome's now twice as fast in the markdown editor
  * firefox still wins
* upgrade to marked.js v1.1.0
* minor fuse + ux fixes



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0514-2302  `v0.4.2`  still not quite emacs (the editor is too good)

* better editor cursor behavior
* better editor autoindent
* less broken fuse client



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0513-2308  `v0.4.1`  Further improvements to overall system stability and other minor adjustments have been made to enhance the user experience

* better editor performance in massive documents
* better undo/redo cursor positioning
* better ux on safari
* better ux on phones
* better



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0512-2244  `v0.4.0`  NIH

* new "basic" markdown editor
  * textarea-based, way less buggy on phones
  * better autoindent + undo/redo
* smaller sfx (~170k)
* osx fixes



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0506-2220  `v0.3.1`  v0.3.1

* indicate version history for files in the browser
* (also move old versions into .hist subfolders)
* handle uploads with illegal filenames on windows
* sortable file list



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0505-2302  `v0.3.0`  docuparty

"why does a file server have a markdown editor"



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  
# 2020-0119-1512  `v0.2.3`  hello world


