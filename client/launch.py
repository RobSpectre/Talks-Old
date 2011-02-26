import mc

listitems = mc.GetDirectory("http://dir.boxee.tv/apps/opensourcetv/index.xml")
mc.GetPlayer().PlaySlideshow(listitems, False, False, "0", False)