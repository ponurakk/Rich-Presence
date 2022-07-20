# Rich-Presence

Simple discord Rich presence for music

### Configuration

- [clientId](#clientId)
- [songCmd](#Cmd)
- [artistCmd](#Cmd)
- [albumCmd](#Cmd)
- [currentTimeCmd](#Cmd)
- [useImg](#useImg)
- [imgDir](#imgDir)
- [covers](#covers)
- [default](#default)

## Important!!!

To show any of the images you must add them to your application.

1. Go to [Discord Developer Portal](https://discord.com/developers/applications/)

2. Go to Your application

3. Go to `Rich Presence` and `Art Assets`

4. Click `Add Image(s)`

As you add images you will see that name was probably changed (if not it will be changed from example `My Greatest Album!!!` to `my_greatest_album_`).

If image name is equal to album name at post it will work **90%** of the time. If not change name in `Rich Presence Assets` or image name localy (or with [covers](#covers) array)

#### clientId:

1. Go to [Discord Developer Portal](https://discord.com/developers/applications/)

2. Create new Application

3. In `General Information` find your Application ID

It should be only numbers

#### Cmd:

`songCmd`, `artistCmd`, `albumCmd` and `currentTimeCmd` will be removed in feature versions. And replaced with only chosing what music player you use. 

They're mostly self explanatory but that's their description.

- `songCmd`: Title of current playing song.

- `artistCmd`: Artist of current playing song.

- `albumCmd`: Album of curr... seriously??

- `currentTimeCmd`: Time that passed from start of the song. (Can be easly implemented with checking song change)

#### useImg:

To use folder with images.

If false it will use [covers](#covers) array.

#### imgDir:

Directory with images. 

**Only used when [useImg](#useImg) is set to `true`**

#### covers:

Simple array with names of Albums (or album covers)

#### default:

What image to use when there is not album.

Can be left blank and discord will show smaller image as large. 