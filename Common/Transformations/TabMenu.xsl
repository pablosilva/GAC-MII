<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:java="http://xml.apache.org/xslt/java" exclude-result-prefixes="java">
  <xsl:include href="/XMII/CM/PEPSICO/Common/Transformations/IllumRowsetLibrary.xsl"/>
  <xsl:template match="/">
    <xsl:variable name="TabEnd">
      <xsl:value-of select="count(Rowsets/Rowset/Row)+1"/>
    </xsl:variable>
    <xsl:for-each select="Rowsets">
      <xsl:for-each select="Rowset">
        <table border="0" cellpadding="0" cellspacing="0" onmouseover="style.cursor='hand';">
          <tr>
            <td width="10"></td>
            <xsl:for-each select="Row">
              <xsl:variable name="RecordId">
                <xsl:value-of select="*[2]"/>
              </xsl:variable>
              <xsl:variable name="TabId">
                <xsl:value-of select="position()"/>
              </xsl:variable>
              <xsl:variable name="TabImage">
                <xsl:if test="position() = '1'">
                  <xsl:text>tab_ini_off.gif</xsl:text>
                </xsl:if>
                <xsl:if test="position() != '1'">
                  <xsl:text>tab_int_off.gif</xsl:text>
                </xsl:if>
              </xsl:variable>
              <td onclick="openRecord('{$RecordId}', {$TabId});" nowrap="nowrap"><img id="tab_img_{$TabId}" src="../Common/Images/{$TabImage}" width="20" height="20" /></td>
              <td onclick="openRecord('{$RecordId}', {$TabId});" id="tab_cel_{$TabId}" nowrap="nowrap" background="../Common/Images/tab_fun_off.gif" class="tab_cel" style="width:123px"><xsl:value-of select="*[1]"/></td>
            </xsl:for-each>
            <td nowrap="nowrap"><img id="tab_img_{$TabEnd}" src="../Common/Images/tab_fim_off.gif" width="3" height="20" /></td>
          </tr>
        </table>
      </xsl:for-each>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
