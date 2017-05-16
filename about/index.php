<!DOCTYPE html>
<html lang="en">

<head>
<?php require_once "../server/header.php"; ?>
<link rel="stylesheet" href="../assets/css/about.css">
<title>About</title>
</head>

<body>
  <!-- NAV -->
  <?php $selected = "about"; require_once "../nav.php" ?>

  <!-- MAIN -->
  <div style="height: 2000px">
    <h1>Hello World!</h1>
    <section class="horizontal horizontal-2 flex">
      <article class="card" style="min-height:50px;background-color:red">aaa</article>
      <article class="card" style="min-height:50px;background-color:green">bbb</article>
    </section>
  </div>

  <section>
    <a href="/about/">About</a>
  </section>
<body>

<?php require_once "../server/footer.php"; ?>
<script type="text/javascript" src="/assets/js/script.js"></script>
</html>
