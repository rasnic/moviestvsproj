<template>
<MoviesGenreTable :userItems="false"/>
</template>

<script>
import MoviesGenreTable from "@/components/MoviesGenreTable";
export default {    //todo
	name: "MovieByGenre",
	components: {MoviesGenreTable}
}
</script>

<style scoped>

</style>