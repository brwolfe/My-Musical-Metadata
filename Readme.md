**ID attribute values**
*SearchArtist* -- Applied to a form, used for templated query links leading to a resource of Artists.
*SearchAlbumName* -- Applied to a form, used for templated query links leading to a resource of Albums.
*SearchAlbumDate* -- Applied to a form, used for templated query links leading to a resource of Albums.
*SearchSongName* -- Applied to a form, used for templated query links leading to a resource of Songs.
*SearchSongGenre* -- Applied to a form, used for templated query links leading to a resource of Songs.
*SearchSongKey* -- Applied to a form, used for templated query links leading to a resource of Songs.
*SearchSongTempo* -- Applied to a form, used for templated query links leading to a resource of Songs.
*Artists* -- Applied to a *<ul>*, used for identifying a list of all Artists.
*NewArtist* --  Applied to a *<form>*, used to template the URI for creating a new Artist resource using POST.
*NewArtistValue* -- Applied to a *<form>*, used to template the URI for updating an Artist resource using PUT.
*Songs* -- Applied to an *<ul>*, used for identifying the Songs in an Album resource.
*NewSong* -- Applied to a *<form>*, used to template the URI for creating a new Song resource using POST.
*NewSongValue* -- Applied to a *<form>*, used to template the URI for updating an Song resource using PUT.
*Albums* -- Applied to an *<ul>*, used for identifying Albums.
*NewAlbum* -- Applied to a *<form>*, used to template the URI for creating a new Album resource using POST.
*NewAlbumValue* -- Applied to a *<form>*, used to template the URI for updating an Album resource using PUT.
*Search* -- Applied to a *<div>*, used for identifying the section of the representation that houses the forms used for templated query links.
*update* -- Applied to a div that contains the form to update the current resource.
*add* -- Applied to a div that contains the form to add a child resource to the current resource.

**Class attribute values**
*SpecificArtist* -- Applied to a *<li>*, used to identify an Artist.
*SpecificAlbum* -- Applied to a *<li>*, used to identify an Album.
*Genre* -- Applied to a *<span>*, used to identify a Genre.
*Key* -- Applied to a *<span>*, used to identify a Key.
*Tempo* -- Applied to a *<span>*, used to identify a Tempo.
*Song* -- Applied to a *<li>*, used to identify a Song.

**Name attribute values**
*SubmitButton* -- Applied to an *<input>* element, used to identify a submit button.
*tempos* -- Applied to an *<menu>* element used to input a Tempo.
*name, datePublished, keys, tempos, genres* -- Applied to a search form input or select that should search by the relevant property of the item.
*item[prop]* -- for any given prop; applied to a form field, identifies the property that should be assigned to the item via the value of that field.

**Rel attribute values**
*album* -- Used on an *<a>* element, describing the linked resource as the Albums by Artist representation.
*artist* -- Used on an *<a>* element, describing the linked resource as the Artist representation.
*song* -- Used on an *<a>* element, describing the linked resource as the Song representation.
*allArtists* -- Used on an *<a>* element, describing the linked resource as the representation for all artists.
*allAlbums* -- Used on an *<a>* element, describing the linked resource as the representation for all songs.
*allSongs* -- Used on an *<a>* element, describing the linked resource as the representation for all songs.

**Ontology**
-Thing
    -name
    -CreativeWork
        -datePublished → Date
        -genre → Text
        -MusicRecording
            -byArtist → MusicGroup
            -duration → Duration
            -inAlbum → MusicAlbum
            -keys → Text (Extension)
            -tempos → Range (Extension)
    -Organization
        -PerformingGroup
            -MusicGroup
                -albums → MusicAlbum