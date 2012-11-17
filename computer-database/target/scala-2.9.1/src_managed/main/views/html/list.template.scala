
package views.html

import play.templates._
import play.templates.TemplateMagic._

import play.api.templates._
import play.api.templates.PlayMagic._
import models._
import controllers._
import java.lang._
import java.util._
import scala.collection.JavaConversions._
import scala.collection.JavaConverters._
import play.api.i18n._
import play.api.templates.PlayMagicForJava._
import play.mvc._
import play.data._
import play.api.data.Field
import com.avaje.ebean._
import play.mvc.Http.Context.Implicit._
import views.html._
/**/
object list extends BaseScalaTemplate[play.api.templates.Html,Format[play.api.templates.Html]](play.api.templates.HtmlFormat) with play.api.templates.Template4[Page[Computer],String,String,String,play.api.templates.Html] {

    /**/
    def apply/*1.2*/(currentPage: Page[Computer], currentSortBy: String, currentOrder: String, currentFilter: String):play.api.templates.Html = {
        _display_ {
def /*32.2*/header/*32.8*/(key:String, title:String):play.api.templates.Html = {_display_(

Seq[Any](format.raw/*32.38*/("""
    <th class=""""),_display_(Seq[Any](/*33.17*/key/*33.20*/.replace(".","_"))),format.raw/*33.37*/(""" header """),_display_(Seq[Any](/*33.46*/if(currentSortBy == key){/*33.72*/{if(currentOrder == "asc") "headerSortDown" else "headerSortUp"}})),format.raw/*33.136*/("""">
        <a href=""""),_display_(Seq[Any](/*34.19*/link(0, key))),format.raw/*34.31*/("""">"""),_display_(Seq[Any](/*34.34*/title)),format.raw/*34.39*/("""</a>
    </th>
""")))};def /*6.2*/link/*6.6*/(newPage:Int, newSortBy:String) = {{
    
    var sortBy = currentSortBy
    var order = currentOrder
    
    if(newSortBy != null) {
        sortBy = newSortBy
        if(currentSortBy == newSortBy) {
            if(currentOrder == "asc") {
                order = "desc"
            } else {
                order = "asc"
            }
        } else {
            order = "asc"
        }
    }
    
    // Generate the link
    routes.Application.list(newPage, sortBy, order, currentFilter)
    
}};
Seq[Any](format.raw/*1.99*/("""

"""),format.raw/*5.42*/("""
"""),format.raw/*27.2*/("""

"""),format.raw/*31.37*/("""
"""),format.raw/*36.2*/("""

"""),_display_(Seq[Any](/*38.2*/main/*38.6*/ {_display_(Seq[Any](format.raw/*38.8*/("""
    
    <h1 id="homeTitle">"""),_display_(Seq[Any](/*40.25*/Messages("computers.list.title", currentPage.getTotalRowCount))),format.raw/*40.87*/("""</h1>

    """),_display_(Seq[Any](/*42.6*/if(flash.containsKey("success"))/*42.38*/ {_display_(Seq[Any](format.raw/*42.40*/("""
        <div class="alert-message warning">
            <strong>Done!</strong> """),_display_(Seq[Any](/*44.37*/flash/*44.42*/.get("success"))),format.raw/*44.57*/("""
        </div>
    """)))})),format.raw/*46.6*/(""" 

    <div id="actions">
        
        <form action=""""),_display_(Seq[Any](/*50.24*/link(0, "name"))),format.raw/*50.39*/("""" method="GET">
            <input type="search" id="searchbox" name="f" value=""""),_display_(Seq[Any](/*51.66*/currentFilter)),format.raw/*51.79*/("""" placeholder="Filter by computer name...">
            <input type="submit" id="searchsubmit" value="Filter by name" class="btn primary">
        </form>
        
        <a class="btn success" id="add" href=""""),_display_(Seq[Any](/*55.48*/routes/*55.54*/.Application.create())),format.raw/*55.75*/("""">Add a new computer</a>
        
    </div>
    
    """),_display_(Seq[Any](/*59.6*/if(currentPage.getTotalRowCount == 0)/*59.43*/ {_display_(Seq[Any](format.raw/*59.45*/("""
        
        <div class="well">
            <em>Nothing to display</em>
        </div>
        
    """)))}/*65.7*/else/*65.12*/{_display_(Seq[Any](format.raw/*65.13*/("""
        
        <table class="computers zebra-striped">
            <thead>
                <tr>
                    """),_display_(Seq[Any](/*70.22*/header("name", "Computer name"))),format.raw/*70.53*/("""
                    """),_display_(Seq[Any](/*71.22*/header("introduced", "Introduced"))),format.raw/*71.56*/("""
                    """),_display_(Seq[Any](/*72.22*/header("discontinued", "Discontinued"))),format.raw/*72.60*/("""
                    """),_display_(Seq[Any](/*73.22*/header("company.name", "Company"))),format.raw/*73.55*/("""
                </tr>
            </thead>
            <tbody>

                """),_display_(Seq[Any](/*78.18*/for(computer <- currentPage.getList) yield /*78.54*/ {_display_(Seq[Any](format.raw/*78.56*/("""
                    <tr>
                        <td><a href=""""),_display_(Seq[Any](/*80.39*/routes/*80.45*/.Application.edit(computer.id))),format.raw/*80.75*/("""">"""),_display_(Seq[Any](/*80.78*/computer/*80.86*/.name)),format.raw/*80.91*/("""</a></td>
                        <td>
                            """),_display_(Seq[Any](/*82.30*/if(computer.introduced == null)/*82.61*/ {_display_(Seq[Any](format.raw/*82.63*/("""
                                <em>-</em>
                            """)))}/*84.31*/else/*84.36*/{_display_(Seq[Any](format.raw/*84.37*/("""
                                """),_display_(Seq[Any](/*85.34*/computer/*85.42*/.introduced.format("dd MMM yyyy"))),format.raw/*85.75*/("""
                            """)))})),format.raw/*86.30*/("""
                        </td>
                        <td>
                            """),_display_(Seq[Any](/*89.30*/if(computer.discontinued == null)/*89.63*/ {_display_(Seq[Any](format.raw/*89.65*/("""
                                <em>-</em>
                            """)))}/*91.31*/else/*91.36*/{_display_(Seq[Any](format.raw/*91.37*/("""
                                """),_display_(Seq[Any](/*92.34*/computer/*92.42*/.discontinued.format("dd MMM yyyy"))),format.raw/*92.77*/("""
                            """)))})),format.raw/*93.30*/("""
                        </td>
                        <td>
                            """),_display_(Seq[Any](/*96.30*/if(computer.company == null)/*96.58*/ {_display_(Seq[Any](format.raw/*96.60*/("""
                                <em>-</em>
                            """)))}/*98.31*/else/*98.36*/{_display_(Seq[Any](format.raw/*98.37*/("""
                                """),_display_(Seq[Any](/*99.34*/computer/*99.42*/.company.name)),format.raw/*99.55*/("""
                            """)))})),format.raw/*100.30*/("""
                        </td>
                    </tr>
                """)))})),format.raw/*103.18*/("""

            </tbody>
        </table>

        <div id="pagination" class="pagination">
            <ul>
                """),_display_(Seq[Any](/*110.18*/if(currentPage.hasPrev)/*110.41*/ {_display_(Seq[Any](format.raw/*110.43*/("""
                    <li class="prev">
                        <a href=""""),_display_(Seq[Any](/*112.35*/link(currentPage.getPageIndex - 1, null))),format.raw/*112.75*/("""">&larr; Previous</a>
                    </li>
                """)))}/*114.19*/else/*114.24*/{_display_(Seq[Any](format.raw/*114.25*/("""
                    <li class="prev disabled">
                        <a>&larr; Previous</a>
                    </li>
                """)))})),format.raw/*118.18*/("""
                <li class="current">
                    <a>Displaying """),_display_(Seq[Any](/*120.36*/currentPage/*120.47*/.getDisplayXtoYofZ(" to "," of "))),format.raw/*120.80*/("""</a>
                </li>
                """),_display_(Seq[Any](/*122.18*/if(currentPage.hasNext)/*122.41*/ {_display_(Seq[Any](format.raw/*122.43*/("""
                    <li class="next">
                        <a href=""""),_display_(Seq[Any](/*124.35*/link(currentPage.getPageIndex + 1, null))),format.raw/*124.75*/("""">Next &rarr;</a>
                    </li>
                """)))}/*126.19*/else/*126.24*/{_display_(Seq[Any](format.raw/*126.25*/("""
                    <li class="next disabled">
                        <a>Next &rarr;</a>
                    </li>
                """)))})),format.raw/*130.18*/("""
            </ul>
        </div>
        
    """)))})),format.raw/*134.6*/("""
        
""")))})),format.raw/*136.2*/("""

            """))}
    }
    
    def render(currentPage:Page[Computer],currentSortBy:String,currentOrder:String,currentFilter:String) = apply(currentPage,currentSortBy,currentOrder,currentFilter)
    
    def f:((Page[Computer],String,String,String) => play.api.templates.Html) = (currentPage,currentSortBy,currentOrder,currentFilter) => apply(currentPage,currentSortBy,currentOrder,currentFilter)
    
    def ref = this

}
                /*
                    -- GENERATED --
                    DATE: Thu Nov 15 15:42:48 CET 2012
                    SOURCE: C:/Users/andersu/Documents/play-2.0.4/samples/java/computer-database/app/views/list.scala.html
                    HASH: a9380022df1cf73f3b096f57043bd1ee68d02f0f
                    MATRIX: 783->1|941->844|955->850|1049->880|1102->897|1114->900|1153->917|1198->926|1232->952|1320->1016|1377->1037|1411->1049|1450->1052|1477->1057|1515->227|1526->231|2057->98|2086->225|2114->732|2144->842|2172->1073|2210->1076|2222->1080|2261->1082|2327->1112|2411->1174|2458->1186|2499->1218|2539->1220|2656->1301|2670->1306|2707->1321|2759->1342|2853->1400|2890->1415|3007->1496|3042->1509|3289->1720|3304->1726|3347->1747|3437->1802|3483->1839|3523->1841|3647->1948|3660->1953|3699->1954|3855->2074|3908->2105|3966->2127|4022->2161|4080->2183|4140->2221|4198->2243|4253->2276|4371->2358|4423->2394|4463->2396|4563->2460|4578->2466|4630->2496|4669->2499|4686->2507|4713->2512|4817->2580|4857->2611|4897->2613|4989->2687|5002->2692|5041->2693|5111->2727|5128->2735|5183->2768|5245->2798|5370->2887|5412->2920|5452->2922|5544->2996|5557->3001|5596->3002|5666->3036|5683->3044|5740->3079|5802->3109|5927->3198|5964->3226|6004->3228|6096->3302|6109->3307|6148->3308|6218->3342|6235->3350|6270->3363|6333->3393|6440->3467|6601->3591|6634->3614|6675->3616|6785->3689|6848->3729|6933->3795|6947->3800|6987->3801|7158->3939|7268->4012|7289->4023|7345->4056|7426->4100|7459->4123|7500->4125|7610->4198|7673->4238|7754->4300|7768->4305|7808->4306|7975->4440|8055->4488|8098->4499
                    LINES: 27->1|29->32|29->32|31->32|32->33|32->33|32->33|32->33|32->33|32->33|33->34|33->34|33->34|33->34|35->6|35->6|57->1|59->5|60->27|62->31|63->36|65->38|65->38|65->38|67->40|67->40|69->42|69->42|69->42|71->44|71->44|71->44|73->46|77->50|77->50|78->51|78->51|82->55|82->55|82->55|86->59|86->59|86->59|92->65|92->65|92->65|97->70|97->70|98->71|98->71|99->72|99->72|100->73|100->73|105->78|105->78|105->78|107->80|107->80|107->80|107->80|107->80|107->80|109->82|109->82|109->82|111->84|111->84|111->84|112->85|112->85|112->85|113->86|116->89|116->89|116->89|118->91|118->91|118->91|119->92|119->92|119->92|120->93|123->96|123->96|123->96|125->98|125->98|125->98|126->99|126->99|126->99|127->100|130->103|137->110|137->110|137->110|139->112|139->112|141->114|141->114|141->114|145->118|147->120|147->120|147->120|149->122|149->122|149->122|151->124|151->124|153->126|153->126|153->126|157->130|161->134|163->136
                    -- GENERATED --
                */
            