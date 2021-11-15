<template>
	<body>
	<div>
    <AddItems :type="'tvShows'"/>
    <AddItems :type="'movies'"/>
	</div>
	  <div>
		  <ItemTableViewer :admin="true" :type="'tvShows'"/>
	  </div>
	  <div>
		  <ItemTableViewer :admin="true" :type="'movies'" />
	  </div>
	</body>
</template>

<script>
import AddItems from "@/components/AddItems";
import ItemTableViewer from "@/components/ItemTableViewer";
export default {
  name: 'Admin',
  components: {
	  ItemTableViewer,
    AddItems,
  },
};
</script>
<style>
html, body{
min-height:100%;
overflow:auto;
}
body {
background-color: #1e1e1e;
}
</style>