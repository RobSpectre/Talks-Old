import mc

listitems = mc.GetDirectory("http://dir.boxee.tv/apps/boxeeforhackers/index.xml")
mc.GetPlayer().PlaySlideshow(listitems, False, False, "0", False)