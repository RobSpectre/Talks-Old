
print '<?xml version="1.0" encoding="utf-8"?>' 
print '<rss version="2.0" xmlns:boxee="http://boxee.tv/rss" xmlns:media="http://search.yahoo.com/mrss/">' 
print '<channel>' 
print '<title>Open Source Television - SCALE9x</title>' 
print '<link>rss://apps.gonzee.tv/eguiders/feedgen.php</link>' 
print '<description>Rob\'s talk about Boxee at the Southern California Linux Expo 2011.</description>' 
print '<language>en-us</language>'

for i in range(53):
    print '<item>'
    print '\t<title>Slide' + str(i) + '</title> '
    print '\t<media:thumbnail url="http://dir.boxee.tv/apps/opensourcetv/slides/img' + str(i) + '.png" />'
    print '\t<media:content url="http://dir.boxee.tv/apps/opensourcetv/slides/img' + str(i) + '.png" type="image/Png" height="600" width="800" />'
    print '</item>'
    
print '</channel>'
print '</rss>'