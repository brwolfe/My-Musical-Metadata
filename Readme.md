**ID attribute values**
*Artists* -- applied to an *<ul>*, used for identifying Artists.
*SearchArtist* -- Applied to a form, used for templated query links leading to a resource of Artists.
*NewArtist* -- Applied to a *<form>*, used to template the URI for creating a new Artist resource using POST.
*NewArtistValue* -- Applied to a *<form>*, used to template the URI for updating an Artist resource using PUT.
*Albums* -- applied to an *<ul>*, used for identifying Albums.
*SearchAlbum* -- Applied to a form, used for templated query links leading to a resource of Albums.
*NewAlbum -- Applied to a *<form>*, used to template the URI for creating a new Album resource using POST.
*NewAlbumValue* -- Applied to a *<form>*, used to template the URI for updating an Album resource using PUT.
*Tracks* -- applied to an *<ul>*, used for identifying Tracks
*SearchTrack* -- Applied to a form, used for templated query links leading to a resource of Tracks.
*NewTrack* -- Applied to a *<form>*, used to template the URI for creating a new Track resource using POST.
*NewTrackValue* -- Applied to a *<form>*, used to template the URI for updating a Track resource using PUT.
*Formats* -- applied to an *<ul>*, used for identifying Formats
*SearchFormat* -- Applied to a form, used for templated query links leading to a resource of Formats.
*NewFormat* -- Applied to a *<form>*, used to template the URI for creating a new Format resource using POST.
*NewFormatValue* -- Applied to a *<form>*, used to template the URI for updating a Format resource using PUT.
*Genres* -- applied to an *<ul>*, used for identifying Genres
*SearchGenre* -- Applied to a form, used for templated query links leading to a resource of Genres.
*NewGenre* -- Applied to a *<form>*, used to template the URI for creating a new Genre resource using POST.
*NewGenreValue* -- Applied to a *<form>*, used to template the URI for updating a Genre resource using PUT.
*Search* -- Applied to a *<div>*, used for identifying the section of the representation that houses the forms used for templated query links.
*update* -- Applied to a div that contains the form to update the current resource.
*add* -- Applied to a div that contains the form to add a child resource to the current resource.

**Class attribute values**
*SpecificArtist* -- Applied to a *<li>*, used to identify an Artist.
*SpecificAlbum* -- Applied to a *<li>*, used to identify an Album.
*SpecificTrack* -- Applied to a *<li>*, used to identify an Artist.
*SpecificFormat* -- Applied to a *<li>*, used to identify an Album.
*SpecificGenre* -- Applied to a *<li>*, used to identify an Artist.

**Name attribute values**
*SubmitButton* -- Applied to an *<input>* element, used to identify a submit button.
*name, yearPublished, trackFormat, trackGenre* -- Applied to a search form input or select that should search by the relevant property of the item.
*item[prop]* -- for any given prop; applied to a form field, identifies the property that should be assigned to the item via the value of that field.

**Rel attribute values**
*artist* -- Used on an *<a>* element, describing the linked resource as the Artist representation.
*album* -- Used on an *<a>* element, describing the linked resource as the Album by Artist representation.
*track* -- Used on an *<a>* element, describing the linked resource as the Track representation.
*format* -- Used on an *<a>* element, describing the linked resource as the Format representation.
*genre* -- Used on an *<a>* element, describing the linked resource as the Format representation.
*allArtists* -- Used on an *<a>* element, describing the linked resource as the representation for all artists.
*allAlbums* -- Used on an *<a>* element, describing the linked resource as the representation for all albums.
*allTracks* -- Used on an *<a>* element, describing the linked resource as the representation for all tracks.
*allFormats* -- Used on an *<a>* element, describing the linked resource as the representation for all formats.
*allGenres* -- Used on an *<a>* element, describing the linked resource as the representation for all genres.
*allMetadata* -- Used on an *<a>* element, describing the linked resource as the representation for the homepage.
