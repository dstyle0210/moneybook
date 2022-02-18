const config = {};
config.version = "/v1.2";
config.root = (location.hostname!="localhost") ? "" : config.version;
config.index=`/${config.root}`;
config.book=`/${config.root}/book`;
config.create=`/${config.root}/create`;
config.update=`/${config.root}/update`;