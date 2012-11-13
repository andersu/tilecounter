<?php
$q=$_GET["q"];

$con = mysql_connect('localhost', 'andersu', 'andersu');
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
echo 'Connected successfully';

mysql_select_db("test", $con);

$sql="SELECT * FROM tile";

$result = mysql_query($sql);

echo "<table border='1'>
<tr>
<th>Game number</th>
<th>Letter</th>
<th>Used</th>
</tr>";

while($row = mysql_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['gamenumber'] . "</td>";
  echo "<td>" . $row['letter'] . "</td>";
  echo "<td>" . $row['used'] . "</td>";
  echo "</tr>";
  }
echo "</table>";

mysql_close($con);
?> 